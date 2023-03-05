import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

export type Post = {
  id: string;
  title: string;
  description: string;
  date: number;
  archived?: boolean;
};

export const parsePost = (post: any): Post => {
  const id = post.id;
  const title = post.properties['Título'].title[0].plain_text;
  const description = (post.properties['Descripción'].rich_text as []).length > 0 ? post.properties['Descripción'].rich_text[0].plain_text : null;
  const date = post.properties.Fecha.date ? new Date(post.properties.Fecha.date.start).getTime() : null;
  const archived = post.archived;
  const createdPost: Post = { id, title, description, date, archived };
  console.log(createdPost);
  return createdPost;
};

export const parseProperties = (database: QueryDatabaseResponse): Post[] =>
  database.results.map(parsePost);