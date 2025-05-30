/**
 * API utilities for handling requests and responses
 */

export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const createAPIHandler = <T = any>(
  handler: (req: any, res: any) => Promise<T>
) => {
  return async (req: any, res: any) => {
    try {
      const result = await handler(req, res);
      return result;
    } catch (error) {
      console.error('API Error:', error);
      
      if (error instanceof APIError) {
        return res.status(error.status).json({
          error: error.message,
          code: error.code,
        });
      }
      
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  };
};

export const validateMethod = (req: any, allowedMethods: string[]) => {
  if (!allowedMethods.includes(req.method)) {
    throw new APIError(405, `Method ${req.method} not allowed`);
  }
};

export const parseRequestBody = async <T = any>(req: any): Promise<T> => {
  try {
    return req.body;
  } catch (error) {
    throw new APIError(400, 'Invalid JSON in request body');
  }
};

export const withCORS = (res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
};

export const rateLimit = (maxRequests: number, windowMs: number) => {
  const requests = new Map<string, number[]>();
  
  return (req: any, res: any, next: () => void) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!requests.has(ip)) {
      requests.set(ip, []);
    }
    
    const userRequests = requests.get(ip)!;
    const validRequests = userRequests.filter(time => time > windowStart);
    
    if (validRequests.length >= maxRequests) {
      throw new APIError(429, 'Too many requests');
    }
    
    validRequests.push(now);
    requests.set(ip, validRequests);
    
    next();
  };
};
