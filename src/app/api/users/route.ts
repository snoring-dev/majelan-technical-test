import { users } from '@/data/mockData';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(users);
}