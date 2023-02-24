import { notion } from './client';

export const queryDatabase = async () =>
  await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID ?? '',
  });

export const queryPost = async (title: string) =>
  await notion.databases.query({
    // Get the post by its URL
    database_id: process.env.NOTION_DATABASE_ID ?? '',
    filter: {
      property: 'Título',
      title: {
        equals: title,
      }
    },
  });