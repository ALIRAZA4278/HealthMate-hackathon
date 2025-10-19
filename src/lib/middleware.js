import { NextResponse } from 'next/server';
import { verifyToken } from './auth';

export function withAuth(handler) {
  return async (req) => {
    try {
      const authHeader = req.headers.get('authorization');

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Unauthorized - No token provided' },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7);
      const decoded = verifyToken(token);

      // Attach user info to request
      req.user = decoded;

      return handler(req);
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
        );
    }
  };
}
