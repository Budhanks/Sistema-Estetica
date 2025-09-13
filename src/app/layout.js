import './globals.css'

export const metadata = {
  title: 'Estética Bella Vista - Sistema de Citas',
  description: 'Sistema de citas para estética. Agenda tu cita de belleza fácil y rápido.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}