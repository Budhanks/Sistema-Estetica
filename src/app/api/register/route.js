// src/app/api/register/route.js - Driver nativo MongoDB
import clientPromise from '@/lib/mongo';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('estetica-citas');
    
    const { nombre, apellido, email, telefono, password } = await request.json();

    if (!nombre || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Nombre, email y contraseña son obligatorios' },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    // Crear usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
      nombre,
      apellido: apellido || '',
      email,
      telefono: telefono || '',
      password: hashedPassword,
      fechaRegistro: new Date(),
      rol: 'cliente'
    };

    const result = await db.collection('users').insertOne(newUser);

    return NextResponse.json({
      success: true,
      message: 'Cliente registrado para citas',
      user: { 
        id: result.insertedId, 
        nombre: newUser.nombre, 
        email: newUser.email 
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { success: false, message: 'Error del servidor' },
      { status: 500 }
    );
  }
}