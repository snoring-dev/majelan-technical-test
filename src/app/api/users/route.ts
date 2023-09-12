import { users } from '@/data/mockData';
import { NextResponse } from 'next/server';

export async function GET() {
  // add some delay to show loading state!
  // @TODO: delete this in production
  await new Promise(r => setTimeout(r, 2000));

  // return all users
  return NextResponse.json(users);
}