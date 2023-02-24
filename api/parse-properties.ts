import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

export type Post = {
  id: string;
  title: string;
  description: string;
  body: string;
  date: number;
};

export const parseProperties = (database: QueryDatabaseResponse): Post[] =>
  database.results.map((row: any) => {
    const id = row.id;
    const title = row.properties['Título'].title[0].plain_text;
    const description = row.properties['Descripción'].rich_text[0].plain_text;
    const body = row.properties.Cuerpo.rich_text[0].plain_text;
    const date = new Date(row.properties.Fecha.date.start).getTime();
    return { id, title, description, body, date };
  });