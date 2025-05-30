/**
 * Application configuration based on environment variables
 */
export const envConfig = {
  // Notion API
  notion: {
    apiKey: process.env.NOTION_API_KEY ?? '',
  },
  
  // Google Cloud Platform
  gcp: {
    clientEmail: process.env.GCP_CLIENT_EMAIL ?? '',
    subjectImpersonationEmail: process.env.CGP_SUBJECT_IMPERSONATION_EMAIL ?? '',
    privateKey: (process.env.GCP_PRIVATE_KEY ?? '').split('\\n').join('\n'),
  },
  
  // Application settings
  app: {
    blogName: process.env.BLOG_NAME ? decodeURI(process.env.BLOG_NAME) : 'JEF Galicia',
    footerText: process.env.BLOG_FOOTER_TEXT 
      ? decodeURI(process.env.BLOG_FOOTER_TEXT) 
      : '© 2023. Todos os dereitos reservados.',
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  },
  
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

/**
 * Validates required environment variables
 */
export function validateEnvConfig(): void {
  const requiredVars = [
    'NOTION_API_KEY',
    'GCP_CLIENT_EMAIL',
    'GCP_PRIVATE_KEY',
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}
