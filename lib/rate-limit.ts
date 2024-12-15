import { NextRequest } from 'next/server';

const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 1;

const requestLog = new Map<string, number[]>();

export async function rateLimit(req: NextRequest): Promise<boolean> {
  const ip = req.ip || 'anonymous';
  const now = Date.now();
  
  // Get existing timestamps for this IP
  const timestamps = requestLog.get(ip) || [];
  
  // Remove timestamps outside the window
  const recentTimestamps = timestamps.filter(ts => now - ts < WINDOW_SIZE);
  
  // Check if rate limit is exceeded
  if (recentTimestamps.length >= MAX_REQUESTS) {
    return true;
  }
  
  // Add current timestamp and update the log
  recentTimestamps.push(now);
  requestLog.set(ip, recentTimestamps);
  
  return false;
}