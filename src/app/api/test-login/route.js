import clientPromise from '@/lib/mongo';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('estetica-citas');
    
    const admin = await db.collection('admins').findOne({ 
      email: 'edu@gmail.com' 
    });
    
    if (!admin) {
      return NextResponse.json({ error: 'Admin no encontrado' });
    }
    
    const passwordValid = await bcrypt.compare('1234', admin.password);
    
    return NextResponse.json({
      adminEncontrado: true,
      email: admin.email,
      nombre: admin.nombre,
      rol: admin.rol,
      passwordFunciona: passwordValid,
      tienePasswordHasheada: admin.password.startsWith('$2')
    });
    
  } catch (error) {
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}