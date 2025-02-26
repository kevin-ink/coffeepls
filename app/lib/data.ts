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
  const user_id = await getSession().then((session) => session.userId);

  try {
    await sql(
      "INSERT INTO posts (user_id, content, beverage, location, recommend) VALUES ($1, $2, $3, $4, $5)",
      [user_id, content, beverage, location, recommend]
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create post");
  }
}

export async function updateCommentRating(id: number, change: number) {
  try {
    await sql("UPDATE comments SET rating = rating + $1 WHERE id = $2", [
      change,
      id,
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to edit comment rating");
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
      rating: comment.rating,
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get comments");
  }
}
