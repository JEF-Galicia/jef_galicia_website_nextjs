import { Client as NotionClient } from '@notionhq/client';
import { admin_directory_v1, Auth as GoogleAuth } from 'googleapis';

const NOTION_API_KEY = process.env.NOTION_API_KEY ?? '';
const GCP_CLIENT_EMAIL = process.env.GCP_CLIENT_EMAIL ?? '';
const CGP_SUBJECT_IMPERSONATION_EMAIL = process.env.CGP_SUBJECT_IMPERSONATION_EMAIL ?? '';
const GCP_PRIVATE_KEY = (process.env.GCP_PRIVATE_KEY ?? '').split("\\n").join("\n") ?? '';

export const notion = new NotionClient({ auth: NOTION_API_KEY });
export const GoogleDirectory = new admin_directory_v1.Admin({
    //auth: new GoogleAuth.OAuth2Client({
    //    clientId: GCP_CLIENT_EMAIL,
    //    clientSecret: GCP_PRIVATE_KEY,
    //}),
    auth: new GoogleAuth.GoogleAuth({
        credentials: {
            client_email: GCP_CLIENT_EMAIL,
            private_key: GCP_PRIVATE_KEY,
        },
        scopes: [
            'https://www.googleapis.com/auth/cloud-platform',
            'https://www.googleapis.com/auth/admin.directory.user.readonly',
            'https://www.googleapis.com/auth/admin.directory.group.readonly'
        ],
    }),
    //auth: new GoogleAuth.JWT({
    //    email: GCP_CLIENT_EMAIL,
    //    key: GCP_PRIVATE_KEY,
    //    scopes: [
    //        'https://www.googleapis.com/auth/cloud-platform',
    //        'https://www.googleapis.com/auth/admin.directory.user.readonly',
    //        'https://www.googleapis.com/auth/admin.directory.group.readonly'
    //    ],
    //    subject: CGP_SUBJECT_IMPERSONATION_EMAIL,
    //})
})