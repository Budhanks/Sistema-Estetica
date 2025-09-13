'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [clientes, setClientes] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    hoy: 0,
    semana: 0
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!user || !token) {
      window.location.href = '/cuenta';
      return;
    }

    const userData = JSON.parse(user);
    if (userData.rol !== 'admin') {
      window.location.href = '/cuenta';
      return;
    }

    setAdmin(userData);
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/clientes', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (data.success) {
        setClientes(data.clientes);
        
        // Calcular estadísticas
        const hoy = new Date().toDateString();
        const semanaAtras = new Date();
        semanaAtras.setDate(semanaAtras.getDate() - 7);
        
        const registrosHoy = data.clientes.filter(cliente => 
          new Date(cliente.fechaRegistro).toDateString() === hoy
        ).length;
        
        const registrosSemana = data.clientes.filter(cliente => 
          new Date(cliente.fechaRegistro) >= semanaAtras
        ).length;
        
        setStats({
          total: data.clientes.length,
          hoy: registrosHoy,
          semana: registrosSemana
        });
      }
    } catch (error) {
      console.error('Error cargando clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh'
      }}>
        <p>Cargando panel administrativo...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header admin">
        <div className="dashboard-nav">
          <h1>Panel de Administración</h1>
          <div className="user-info">
            <span>Admin: {admin?.nombre}</span>
            <button className="logout-btn" onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="admin-panel">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="icon">👥</div>
            <h3>Total Clientes</h3>
            <div className="number">{stats.total}</div>
          </div>

          <div className="stat-card">
            <div className="icon">📅</div>
            <h3>Registros Hoy</h3>
            <div className="number">{stats.hoy}</div>
          </div>

          <div className="stat-card">
            <div className="icon">📊</div>
            <h3>Esta Semana</h3>
            <div className="number">{stats.semana}</div>
          </div>

          <div className="stat-card">
            <div className="icon">✨</div>
            <h3>Sistema</h3>
            <div className="number" style={{ fontSize: '1.2rem', color: '#27ae60' }}>
              Activo
            </div>
          </div>
        </div>

        <div className="clientes-section">
          <div className="clientes-header">
            <h2>Clientes Registrados para Citas</h2>
          </div>
          
          {clientes.length === 0 ? (
            <div style={{ 
              padding: '40px', 
              textAlign: 'center', 
              color: '#666' 
            }}>
              <p>No hay clientes registrados aún</p>
            </div>
          ) : (
            <div>
              {clientes.map((cliente, index) => (
                <div key={cliente._id} className="cliente-item">
                  <div className="cliente-info">
                    <h4>{cliente.nombre} {cliente.apellido}</h4>
                    <p>📧 {cliente.email}</p>
                    {cliente.telefono && (
                      <p>📱 {cliente.telefono}</p>
                    )}
                  </div>
                  
                  <div className="cliente-status">
                    <div className="status-badge">
                      Listo para Cita
                    </div>
                    <div className="date-text">
                      {formatearFecha(cliente.fechaRegistro)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #6c63ff, #8a7fff)',
          color: 'white',
          borderRadius: '15px',
          padding: '25px',
          marginTop: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '15px' }}>
            Instrucciones para el Administrador
          </h3>
          <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
            <p>• Cada cliente registrado está listo para agendar su cita</p>
            <p>• Contacta a los clientes usando su email o teléfono</p>
            <p>• Coordina horarios disponibles según sus preferencias</p>
            <p>• El sistema registra automáticamente fecha y hora de registro</p>
          </div>
        </div>
      </div>
    </div>
  );
}