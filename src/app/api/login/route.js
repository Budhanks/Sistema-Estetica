// src/app/api/login/route.js - Driver nativo MongoDB
import clientPromise from '@/lib/mongo';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('estetica-citas');
    
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email y contraseña requeridos' },
        { status: 400 }
      );
    }

    // Buscar en usuarios normales
    let user = await db.collection('users').findOne({ email });
    let isAdmin = false;

    // Si no es usuario normal, buscar en admins
    if (!user) {
      user = await db.collection('admins').findOne({ email });
      isAdmin = true;
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Usuario no encontrado' },
        { status: 400 }
      );
    }

    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Contraseña incorrecta' },
        { status: 400 }
      );
    }

    // Crear token JWT
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        rol: user.rol 
      },
      process.env.JWT_SECRET || 'mi-secreto-estetica-citas-2024',
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      success: true,
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido || '',
        email: user.email,
        telefono: user.telefono || '',
        rol: user.rol
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { success: false, message: 'Error del servidor' },
      { status: 500 }
    );
  }
}