import { NextRequest } from 'next/server';

const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 1;

const requestLog = new Map<string, number[]>();

export async function rateLimit(req: NextRequest): Promise<boolean> {
  const ip = req.ip || 'anonymous';
  const now = Date.now();
  
  const timestamps = requestLog.get(ip) || [];
  const recentTimestamps = timestamps.filter(ts => now - ts < WINDOW_SIZE);
  
  if (recentTimestamps.length >= MAX_REQUESTS) {
    return true;
  }
  
  recentTimestamps.push(now);
  requestLog.set(ip, recentTimestamps);
  
  return false;
}