import { NextResponse } from 'next/server';

export async function GET() {
  const uri = process.env.MONGODB_URI;
  
  return NextResponse.json({
    uriExists: !!uri,
    containsAdminEstetica: uri?.includes('admin_estetica'),
    containsEduardoferia: uri?.includes('eduardoferia_db_user'),
    firstChars: uri?.substring(0, 60),
    envFile: process.env.NODE_ENV
  });
}