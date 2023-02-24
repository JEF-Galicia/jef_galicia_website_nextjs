import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

export type Post = {
  id: string;
  title: string;
  description: string;
  date: number;
};

export const parsePost = (post: any): Post => {
  const id = post.id;
  const title = post.properties['Título'].title[0].plain_text;
  const description = post.properties['Descripción'].rich_text[0].plain_text;
  const date = new Date(post.properties.Fecha.date.start).getTime();
  return { id, title, description, date };
};

export const parseProperties = (database: QueryDatabaseResponse): Post[] =>
  database.results.map(parsePost);