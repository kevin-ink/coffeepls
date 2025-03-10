"use server";
import { neon } from "@neondatabase/serverless";
import { getSession } from "../actions";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const sql = neon(process.env.DATABASE_URL);

async function init() {
  await sql`SET TIMEZONE = 'America/Los_Angeles'`;
}

init();

export async function createPost(formData: FormData) {
  const content = formData.get("content");
  const beverage = formData.get("beverage");
  const location = formData.get("location");
  const recommend = formData.get("recommend") === "true";
  const image_url = formData.get("image_url") || "";
  const user_id = await getSession().then((session) => session.userId);

  try {
    await sql(
      "INSERT INTO posts (user_id, content, beverage, location, recommend, image_url) VALUES ($1, $2, $3, $4, $5, $6)",
      [user_id, content, beverage, location, recommend, image_url]
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create post");
  }
}

export async function createComment(formData: FormData) {
  const content = formData.get("content");
  const post_id = formData.get("post_id");
  const username = await getSession().then((session) => session.username);

  try {
    await sql(
      "INSERT INTO comments (post_id, username, content) VALUES ($1, $2, $3)",
      [post_id, username, content]
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create post");
  }
}

export async function getUsername() {
  const username = await getSession().then((session) => session.username);
  return username;
}

export async function getPostById(post_id: number) {
  try {
    const post = await sql(
      `SELECT posts.*, users.username
       FROM posts 
       JOIN users ON posts.user_id = users.id 
       WHERE post_id = $1`,
      [post_id]
    );
    return post.map((post) => ({
      id: post.post_id,
      username: post.username,
      content: post.content,
      beverage: post.beverage,
      location: post.location,
      recommend: post.recommend,
      created_at: post.created_at,
      image_url: post.image_url,
    }))[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getPosts() {
  try {
    const posts = await sql(
      `SELECT posts.*, users.username 
       FROM posts 
       JOIN users ON posts.user_id = users.id 
       ORDER BY posts.created_at DESC 
       LIMIT 5`
    );
    return posts.map((post) => ({
      id: post.post_id,
      username: post.username,
      content: post.content,
      beverage: post.beverage,
      location: post.location,
      recommend: post.recommend,
      created_at: post.created_at,
      image_url: post.image_url,
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get posts");
  }
}

export async function getPostsByUsername(username: string) {
  try {
    const posts = await sql(
      `SELECT posts.*, users.username 
       FROM posts 
       JOIN users ON posts.user_id = users.id 
       WHERE users.username = $1
       ORDER BY posts.created_at DESC`,
      [username]
    );
    return posts.map((post) => ({
      id: post.post_id,
      username: post.username,
      content: post.content,
      beverage: post.beverage,
      location: post.location,
      recommend: post.recommend,
      created_at: post.created_at,
      image_url: post.image_url,
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get posts");
  }
}

export async function getPostsByUserLiked(username: string) {
  try {
    const posts = await sql(
      `SELECT posts.*, users.username
      FROM Likes
      JOIN Posts ON likes.post_id = posts.post_id
      JOIN Users ON likes.user_id = users.id
      WHERE users.username = $1;
      `,
      [username]
    );
    return posts.map((post) => ({
      id: post.post_id,
      username: post.username,
      content: post.content,
      beverage: post.beverage,
      location: post.location,
      recommend: post.recommend,
      created_at: post.created_at,
      image_url: post.image_url,
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get posts");
  }
}

export async function getComments(post_id: number) {
  try {
    const comments = await sql(
      `SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC`,
      [post_id]
    );
    return comments.map((comment) => ({
      id: comment.id,
      username: comment.username,
      content: comment.content,
      created_at: comment.created_at,
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get comments");
  }
}

export async function postLike(post_id: number) {
  const user_id = await getSession().then((session) => session.userId);

  try {
    await sql(`INSERT INTO likes (user_id, post_id) VALUES ($1, $2)`, [
      user_id,
      post_id,
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to like post");
  }
}

export async function removePostLike(post_id: number) {
  const user_id = await getSession().then((session) => session.userId);

  try {
    await sql(`DELETE FROM likes WHERE user_id = $1 AND post_id = $2`, [
      user_id,
      post_id,
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to remove like");
  }
}

export async function postIsLiked(post_id: number, user_id: number) {
  const result = await sql(
    `SELECT * FROM likes WHERE user_id = $1 AND post_id = $2`,
    [user_id, post_id]
  );
  return result.length > 0;
}

export async function getPostLikes(post_id: number) {
  const result = await sql(`SELECT * FROM likes WHERE post_id = $1`, [post_id]);
  return result.length;
}

export async function updateUserCaffeine(caffeine: number, date: string) {
  const user_id = await getSession().then((session) => session.userId);

  try {
    const result = await sql(
      `INSERT INTO caffeine (user_id, date, caffeine_total, items)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id, date)
      DO UPDATE 
      SET 
        caffeine_total = caffeine.caffeine_total + $3,
        items = caffeine.items + 1
      RETURNING caffeine_total, items;
      `,
      [user_id, date, caffeine, 1]
    );

    if (result && result.length > 0) {
      return {
        caffeine: result[0].caffeine_total,
        items: result[0].items,
      };
    } else {
      throw new Error("Failed to update caffeine");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update caffeine");
  }
}

export async function getUserCaffeine(date: string) {
  const user_id = await getSession().then((session) => session.userId);

  try {
    const res = await sql(
      `SELECT caffeine_total, items FROM caffeine WHERE user_id = $1 AND date = $2`,
      [user_id, date]
    );

    if (res) {
      return {
        caffeine: res[0].caffeine_total,
        items: res[0].items,
      };
    }
  } catch {
    return;
  }
}

export async function getCaffeineHistory() {
  const user_id = await getSession().then((session) => session.userId);

  try {
    const logs =
      await sql`SELECT * FROM caffeine WHERE user_id = ${user_id} ORDER BY date DESC`;
    return logs.map((log) => ({
      date: log.date,
      caffeine: log.caffeine_total,
      items: log.items,
    }));
  } catch {
    return [];
  }
}
