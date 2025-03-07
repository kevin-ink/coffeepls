"use server";

import { signUpFormSchema } from "@/app/lib/definitions";
import { defaultSession, sessionOptions } from "@/app/lib/session";
import { SessionData } from "@/app/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sql } from "./lib/data";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function getUserId() {
  const session = await getSession();
  return session.userId;
}

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
}

export async function logout() {
  const session = await getSession();

  session.destroy();
  redirect("/");
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email || !password) {
    return {
      error: "Invalid email or password.",
    };
  }

  const user = await sql("SELECT * FROM users WHERE email = $1", [email]);

  const passwordMatch = bcrypt.compare(password, user[0].password);

  if (email.length === 0 || !passwordMatch) {
    console.error("Invalid password.");
    return {
      error: "Invalid email or password.",
    };
  }

  const session = await getSession();

  session.isLoggedIn = true;
  const usernameResult = await sql(
    "SELECT username FROM users WHERE email = $1",
    [email]
  );
  session.username = usernameResult[0]?.username;
  session.userId = user[0].id;

  await session.save();

  redirect("/home");
}

export async function signup(formData: FormData) {
  const validatedFields = signUpFormSchema.safeParse({
    username: formData.get("username")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
    confirmPassword: formData.get("confirmPassword")?.toString(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );

    const session = await getSession();

    session.isLoggedIn = true;
    session.username = username;
    const user = await sql("SELECT id FROM users WHERE username = $1", [
      username,
    ]);
    session.userId = user[0].id;

    await session.save();
  } catch (error) {
    console.error(error);

    const errors: {
      email?: string[];
      username?: string[];
      password?: string[];
      confirmPassword?: string[];
    } = {};

    if (
      error instanceof Error &&
      error.message.includes(
        'duplicate key value violates unique constraint "users_email_key"'
      )
    ) {
      errors.email = ["Email already exists."];
    }

    if (
      error instanceof Error &&
      error.message.includes(
        'duplicate key value violates unique constraint "users_username_key"'
      )
    ) {
      errors.username = ["Username already exists."];
    }

    return { errors };
  }

  redirect("/home");
}
