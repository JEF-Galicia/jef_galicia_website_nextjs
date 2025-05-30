/**
 * Google Directory API operations
 */
import { GoogleDirectory } from "./client";
import { APIError } from '../lib/utils/api';

/**
 * Get user tagline from Google Directory
 */
export const getTagline = async (userKey: string): Promise<string | null> => {
  try {
    const response = await GoogleDirectory.users.get({
      userKey,
      projection: 'full',
    });

    return response.data.organizations?.[0]?.title || null;
  } catch (error) {
    console.error(`Failed to get tagline for user ${userKey}:`, error);
    throw new APIError(500, 'Failed to fetch user tagline');
  }
};

/**
 * Get user information from Google Directory
 */
export const getUserInfo = async (userKey: string) => {
  try {
    const response = await GoogleDirectory.users.get({
      userKey,
      projection: 'full',
    });

    return {
      email: response.data.primaryEmail,
      name: response.data.name?.fullName,
      firstName: response.data.name?.givenName,
      lastName: response.data.name?.familyName,
      photo: response.data.thumbnailPhotoUrl,
      organization: response.data.organizations?.[0],
      phone: response.data.phones?.[0]?.value,
    };
  } catch (error) {
    console.error(`Failed to get user info for ${userKey}:`, error);
    throw new APIError(500, 'Failed to fetch user information');
  }
};

/**
 * Get group members from Google Directory
 */
export const getGroupMembers = async (groupKey: string) => {
  try {
    const response = await GoogleDirectory.members.list({
      groupKey,
    });

    return response.data.members || [];
  } catch (error) {
    console.error(`Failed to get members for group ${groupKey}:`, error);
    throw new APIError(500, 'Failed to fetch group members');
  }
};