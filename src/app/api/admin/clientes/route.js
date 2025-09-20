import clientPromise from '@/lib/mongo';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('estetica-citas');

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Token requerido' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'mi-secreto-estetica-citas-2024'
      );
      
      if (decoded.rol !== 'admin') {
        return NextResponse.json(
          { success: false, message: 'Solo administradores' },
          { status: 403 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Token inválido' },
        { status: 401 }
      );
    }

    const clientes = await db.collection('users')
      .find(
        { rol: 'cliente' }, 
        { 
          projection: { password: 0 },
          sort: { fechaRegistro: -1 }
        }
      )
      .toArray();

    return NextResponse.json({
      success: true,
      clientes: clientes,
      total: clientes.length
    });

  } catch (error) {
    console.error('Error obteniendo clientes:', error);
    return NextResponse.json(
      { success: false, message: 'Error del servidor' },
      { status: 500 }
    );
  }
}