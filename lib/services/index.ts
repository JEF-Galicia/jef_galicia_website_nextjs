/**
 * Service layer for handling API calls and data operations
 */

import { APP_CONFIG, API_CONFIG } from '../constants';
import type { Member, Group, Post } from '../types';

class APIService {
  private baseUrl: string;

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Member operations
  async getMembers(): Promise<Member[]> {
    return this.request<Member[]>('/api/members');
  }

  async getMember(email: string): Promise<Member> {
    return this.request<Member>(`/api/members/${encodeURIComponent(email)}`);
  }

  // Team operations
  async getTeams(): Promise<Group[]> {
    return this.request<Group[]>('/api/teams');
  }

  async getTeam(email: string): Promise<Group> {
    return this.request<Group>(`/api/teams/${encodeURIComponent(email)}`);
  }

  // Project operations
  async getProjects(): Promise<Group[]> {
    return this.request<Group[]>('/api/projects');
  }

  async getProject(id: string): Promise<Group> {
    return this.request<Group>(`/api/projects/${id}`);
  }

  // Blog operations
  async getBlogPosts(): Promise<Post[]> {
    return this.request<Post[]>('/api/blog');
  }

  async getBlogPost(id: string): Promise<Post> {
    return this.request<Post>(`/api/blog/${id}`);
  }

  // Newsletter subscription
  async subscribeToNewsletter(email: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>('/api/subscribe_mailing_list', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Contact form
  async submitContactForm(data: {
    name: string;
    email: string;
    message: string;
  }): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Singleton instance
export const apiService = new APIService();

/**
 * Higher-level service functions with caching and error handling
 */
class DataService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  private getCacheKey(key: string): string {
    return key;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.cacheTimeout;
  }

  private setCache<T>(key: string, data: T): void {
    this.cache.set(this.getCacheKey(key), {
      data,
      timestamp: Date.now(),
    });
  }

  private getCache<T>(key: string): T | null {
    const cached = this.cache.get(this.getCacheKey(key));
    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data;
    }
    return null;
  }

  async getMembers(): Promise<Member[]> {
    const cacheKey = 'members';
    const cached = this.getCache<Member[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const members = await apiService.getMembers();
      this.setCache(cacheKey, members);
      return members;
    } catch (error) {
      console.error('Failed to fetch members:', error);
      throw error;
    }
  }

  async getMember(email: string): Promise<Member> {
    const cacheKey = `member-${email}`;
    const cached = this.getCache<Member>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const member = await apiService.getMember(email);
      this.setCache(cacheKey, member);
      return member;
    } catch (error) {
      console.error(`Failed to fetch member ${email}:`, error);
      throw error;
    }
  }

  async getTeams(): Promise<Group[]> {
    const cacheKey = 'teams';
    const cached = this.getCache<Group[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const teams = await apiService.getTeams();
      this.setCache(cacheKey, teams);
      return teams;
    } catch (error) {
      console.error('Failed to fetch teams:', error);
      return [];
    }
  }

  async getProjects(): Promise<Group[]> {
    const cacheKey = 'projects';
    const cached = this.getCache<Group[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const projects = await apiService.getProjects();
      this.setCache(cacheKey, projects);
      return projects;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  }

  async getBlogPosts(): Promise<Post[]> {
    const cacheKey = 'blog-posts';
    const cached = this.getCache<Post[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const posts = await apiService.getBlogPosts();
      this.setCache(cacheKey, posts);
      return posts;
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      throw error;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }

  clearCacheItem(key: string): void {
    this.cache.delete(this.getCacheKey(key));
  }
}

// Singleton instance
export const dataService = new DataService();
