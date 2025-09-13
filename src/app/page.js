export default function Home() {
  return (
    <div className="estetica-home">
      {/* Header */}
      <header className="header">
        <h1>✨ Alice Fashion ✨</h1>
        <nav>
          <a href="/">Inicio</a>
          <a href="/cuenta">Agendar Cita</a>
        </nav>
      </header>

      {/* Sección principal */}
      <section className="hero-section">
        <h1>Tu belleza es nuestra prioridad</h1>
        <p>
          Agenda tu cita en nuestra estética y déjate consentir por nuestros especialistas. 
          Ofrecemos servicios de calidad para realzar tu belleza natural.
        </p>
        
        <a href="/cuenta" className="cta-button">
          ¡Agenda tu cita Ahora!
        </a>
      </section>

      {/* Servicios disponibles */}
      <section className="servicios-grid">
        <div className="servicio-card">
          <div className="servicio-icon">
            <img 
              src="/Cortes.jpg" 
              alt="Cortes y Peinados" 
              style={{ 
                width: '60px', 
                height: '60px', 
                objectFit: 'cover', 
                borderRadius: '50%' 
              }} 
            />
          </div>
          <h3>Cortes y Peinados</h3>
          <p>Cortes modernos para dama y caballero. Desde $150 - $250</p>
        </div>

        <div className="servicio-card">
          <div className="servicio-icon">
            <img 
              src="/Tintes.jpg" 
              alt="Tintes y Color" 
              style={{ 
                width: '60px', 
                height: '60px', 
                objectFit: 'cover', 
                borderRadius: '50%' 
              }} 
            />
          </div>
          <h3>Tintes y Color</h3>
          <p>Coloración profesional, mechas y rayitos. Desde $350 - $450</p>
        </div>

        <div className="servicio-card">
          <div className="servicio-icon">
            <img 
              src="/Manicure.jpg" 
              alt="Manicure y Pedicure" 
              style={{ 
                width: '60px', 
                height: '60px', 
                objectFit: 'cover', 
                borderRadius: '50%' 
              }} 
            />
          </div>
          <h3>Manicure y Pedicure</h3>
          <p>Cuidado completo de manos y pies. Desde $120 - $200</p>
        </div>

        <div className="servicio-card">
          <div className="servicio-icon">
            <img 
              src="/Tratamiento_facial.webp" 
              alt="Tratamientos Faciales" 
              style={{ 
                width: '60px', 
                height: '60px', 
                objectFit: 'cover', 
                borderRadius: '50%' 
              }} 
            />
          </div>
          <h3>Tratamientos Faciales</h3>
          <p>Limpiezas faciales y tratamientos anti-edad. Desde $280 - $400</p>
        </div>

        <div className="servicio-card">
          <div className="servicio-icon">
            <img 
              src="/pestañas.jpg" 
              alt="Cejas y Pestañas" 
              style={{ 
                width: '60px', 
                height: '60px', 
                objectFit: 'cover', 
                borderRadius: '50%' 
              }} 
            />
          </div>
          <h3>Cejas y Pestañas</h3>
          <p>Diseño de cejas, depilación y aplicación de pestañas. Desde $80 - $180</p>
        </div>

        <div className="servicio-card">
          <div className="servicio-icon">
            <img 
              src="/Servicios_especiales.jpg" 
              alt="Servicios Especiales" 
              style={{ 
                width: '60px', 
                height: '60px', 
                objectFit: 'cover', 
                borderRadius: '50%' 
              }} 
            />
          </div>
          <h3>Servicios Especiales</h3>
          <p>Maquillaje para eventos, peinados de fiesta. Desde $300 - $600</p>
        </div>
      </section>

      {/* Proceso simple */}
      <section style={{ 
        background: 'white', 
        padding: '50px 20px', 
        textAlign: 'center',
        margin: '40px 0' 
      }}>
        <h2 style={{ color: '#d63384', marginBottom: '30px', fontSize: '2rem' }}>
          Proceso súper fácil
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>1️⃣</div>
            <h3 style={{ color: '#d63384', marginBottom: '10px' }}>Regístrate</h3>
            <p style={{ color: '#6c4a5c' }}>Crea tu cuenta con tus datos básicos</p>
          </div>
          
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>2️⃣</div>
            <h3 style={{ color: '#d63384', marginBottom: '10px' }}>Confirma</h3>
            <p style={{ color: '#6c4a5c' }}>Recibe confirmación en tu panel personal</p>
          </div>
          
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>3️⃣</div>
            <h3 style={{ color: '#d63384', marginBottom: '10px' }}>¡Ven!</h3>
            <p style={{ color: '#6c4a5c' }}>Visítanos para coordinar tu cita perfecta</p>
          </div>
        </div>
      </section>

      {/* Información del local */}
      <section style={{
        background: 'linear-gradient(135deg, #ff6b9d, #ffa8c6)',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.8rem' }}>
          Ubicación
        </h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
          📍 Calle Principal #123, Centro, Ciudad
        </p>
        <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
          📞 Tel: (55) 2139-0940
        </p>
        <p style={{ fontSize: '1.1rem' }}>
          🕒 Lun-Sáb: 9:00 AM - 7:00 PM | Dom: 10:00 AM - 4:00 PM
        </p>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#333',
        color: '#ccc',
        textAlign: 'center',
        padding: '20px'
      }}>
        <p>© 2025 Estética Alice Fashion - Agenda tu cita </p>
      </footer>
    </div>
  );
}