import { admin_directory_v1 } from 'googleapis';

// Common types used across the application
export interface User extends admin_directory_v1.Schema$User {}
export interface UserPhoto extends admin_directory_v1.Schema$UserPhoto {}
export interface Group extends admin_directory_v1.Schema$Group {}
export interface Groups extends admin_directory_v1.Schema$Groups {}
export interface Members extends admin_directory_v1.Schema$Members {}
export interface Member extends admin_directory_v1.Schema$Member {}

// Component prop types
export interface MemberCardProps {
  user: User;
  photo: UserPhoto | null;
  tagline?: string;
}

export interface PageProps {
  users?: User[];
  photos?: UserPhoto[];
  groups?: Groups;
  memberships?: { [key: string]: Members };
  projects?: Group[];
  teams?: Group[];
}

// Project component props
export interface ProjectComponentProps {
  name: string | React.ReactNode;
  description: string | React.ReactNode;
  children?: React.ReactNode;
  image?: React.ReactNode;
  email?: string;
}

// Global context type
export interface GlobalContextType {
  globalContext: {
    name: string;
  };
  setContext: (context: any) => void;
}

// Notion types
export interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
}

// Locale type
export type Locale = 'gl' | 'es' | 'en';

// Theme type
export type Theme = 'light' | 'dark' | 'system';
