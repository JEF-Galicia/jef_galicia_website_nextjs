import { notion } from './client';

export const queryDatabase = async () =>
  await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID ?? '',
  });

export const queryPost = async (url: string) =>
  await notion.pages.retrieve({
    // Get the post by its URL
    page_id: url
  });