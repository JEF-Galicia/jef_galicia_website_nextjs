/**
 * API clients configuration
 */
import { Client as NotionClient } from '@notionhq/client';
import { admin_directory_v1, Auth as GoogleAuth } from 'googleapis';
import { API_CONFIG } from '../lib/constants';

// Environment variables with validation
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const GCP_CLIENT_EMAIL = process.env.GCP_CLIENT_EMAIL;
const GCP_PRIVATE_KEY = process.env.GCP_PRIVATE_KEY?.split("\\n").join("\n");

if (!NOTION_API_KEY) {
  console.warn('NOTION_API_KEY is not configured');
}

if (!GCP_CLIENT_EMAIL || !GCP_PRIVATE_KEY) {
  console.warn('Google Cloud Platform credentials are not properly configured');
}

/**
 * Notion client instance
 */
export const notion = new NotionClient({ 
  auth: NOTION_API_KEY 
});

/**
 * Google Directory API client
 */
export const GoogleDirectory = new admin_directory_v1.Admin({
  auth: new GoogleAuth.GoogleAuth({
    credentials: {
      client_email: GCP_CLIENT_EMAIL,
      private_key: GCP_PRIVATE_KEY,
    },
    scopes: [...API_CONFIG.google.scopes],
  }),
});