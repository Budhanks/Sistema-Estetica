'use client';

import { useState, useEffect } from 'react';

export default function ClienteDashboard() {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!user || !token) {
      window.location.href = '/cuenta';
      return;
    }

    const userData = JSON.parse(user);
    if (userData.rol !== 'cliente') {
      window.location.href = '/cuenta';
      return;
    }

    setCliente(userData);
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh'
      }}>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-nav">
          <h1>Mi Panel de Citas</h1>
          <div className="user-info">
            <span>Hola, {cliente?.nombre}!</span>
            <button className="logout-btn" onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="completed-panel">
        <div className="completion-card">
          <div className="completion-icon">🎉</div>
          <h1 className="completion-title">¡Registro Completado!</h1>
          <p className="completion-subtitle">
            {cliente?.nombre} {cliente?.apellido}, tu registro para agendar cita 
            en nuestra estética ha sido exitoso.
          </p>
          
          <div className="next-steps">
            <h3>¿Qué sigue ahora?</h3>
            <p>
              Para coordinar tu cita, puedes visitarnos directamente en nuestro local 
              o llamarnos por teléfono. Nuestro equipo te ayudará a elegir el mejor 
              horario y servicio para ti.
            </p>
          </div>

          <button 
            onClick={() => window.location.href = '/'}
            className="cta-button"
            style={{ marginTop: '20px' }}
          >
            Volver al Inicio
          </button>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h2 style={{ color: '#d63384', marginBottom: '20px' }}>
            Tu Información Registrada
          </h2>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontWeight: 'bold', minWidth: '80px', color: '#666' }}>
                Nombre:
              </span>
              <span>{cliente?.nombre} {cliente?.apellido}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontWeight: 'bold', minWidth: '80px', color: '#666' }}>
                Email:
              </span>
              <span>{cliente?.email}</span>
            </div>
            
            {cliente?.telefono && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px', color: '#666' }}>
                  Teléfono:
                </span>
                <span>{cliente?.telefono}</span>
              </div>
            )}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #ff6b9d, #ffa8c6)',
          color: 'white',
          borderRadius: '20px',
          padding: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '15px', fontSize: '1.5rem' }}>
            Información de Contacto
          </h3>
          <div style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            <p>📍 Calle Principal #123, Centro, Ciudad</p>
            <p>📞 Tel: (55) 2139-0940</p>
            <p>🕒 Lun-Sáb: 9:00 AM - 7:00 PM</p>
            <p>🕒 Dom: 10:00 AM - 4:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}