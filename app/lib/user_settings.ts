"use server";

import { sql } from "./data";
import { getSession } from "../actions";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  const user_id = await getSession().then((session) => session.userId);
  if (!user_id) {
    throw new Error("User not logged in");
  }

  try {
    const res = await sql`SELECT * FROM settings WHERE user_id = ${user_id}`;
    if (res.length > 0) {
      return {
        caffeine_limit: res[0].caffeine_limit,
      };
    }

    await setupSettings(user_id);
    return await getSettings();
  } catch {
    console.error("Failed to get settings");
    throw new Error("Failed to get settings");
  }
}

export async function setupSettings(user_id: number) {
  try {
    await sql(
      `INSERT INTO settings (user_id, caffeine_limit) VALUES ($1, $2)`,
      [user_id, 400]
    );
  } catch {
    console.error("Failed to setup settings");
    throw new Error("Failed to setup settings");
  }
}

export async function updateSettings(formData: FormData) {
  const caffeine_limit = formData.get("caffeineLimit");
  if (!caffeine_limit) {
    return;
  }

  const user_id = await getSession().then((session) => session.userId);
  if (!user_id) {
    throw new Error("User not logged in");
  }

  try {
    await sql`UPDATE settings SET caffeine_limit = ${caffeine_limit} WHERE user_id = ${user_id}`;
  } catch {
    console.error("Failed to update settings");
    throw new Error("Failed to update settings");
  }

  revalidatePath("/settings");
}
