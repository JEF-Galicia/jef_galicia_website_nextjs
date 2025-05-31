// Application constants
export const APP_CONFIG = {
  name: 'JEF Galicia',
  domain: 'jef.gal',
  teamsDomain: 'teams.jef.gal',
  projectsDomain: 'projects.jef.gal',
  defaultLocale: 'gl' as const,
  supportedLocales: ['gl', 'es', 'en'] as const,
} as const;

// API endpoints and configurations
export const API_CONFIG = {
  notion: {
    baseUrl: 'https://api.notion.com/v1',
  },
  google: {
    scopes: [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/admin.directory.user.readonly',
      'https://www.googleapis.com/auth/admin.directory.group.readonly',
    ],
  },
} as const;

// Route paths
export const ROUTES = {
  home: '/',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  join: '/join',
  blog: '/blog',
  projects: '/projects',
  members: '/about/members',
  teams: '/about/teams',
  federation: '/about/federation',
  whatWeDo: '/about/what_we_do',
} as const;

// Social media links
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/jef_galicia/',
  twitter: 'https://twitter.com/jef_galicia/',
  facebook: 'https://www.facebook.com/jef.galic/',
  linkedin: 'https://www.linkedin.com/company/jef-galicia/',
  jefSpain: 'https://jefspain.org',
  jefSections: 'https://www.jefspain.org/secciones',
  jefSpainSignup: 'https://forms.jefspain.org/alta',
} as const;

// Theme configuration
export const THEME_CONFIG = {
  storageKey: 'theme',
  defaultTheme: 'system',
  themes: ['light', 'dark', 'system'],
} as const;
