import React from 'react';
import './Navegacion.css';

const Navegacion = ({ paginaActual, onChange }) => {
  const paginas = [
    { id: 'registrar-producto', nombre: '📝 Registrar Producto', actor: 'PRODUCTOR' },
    { id: 'registrar-traslado', nombre: '🚚 Registrar Traslado', actor: 'DISTRIBUIDOR' },
    { id: 'confirmar-recepcion', nombre: '📦 Confirmar Recepción', actor: 'COMERCIANTE' },
    { id: 'escanear-qr', nombre: '🔍 Escanear QR', actor: 'CONSUMIDOR' },
    { id: 'ver-auditoria', nombre: '🔐 Ver Auditoría', actor: 'ADMINISTRADOR' },
  ];

  return (
    <nav className="navegacion">
      <div className="nav-container">
        <div className="nav-logo">
          <h1>🌾 Trazaalimentos</h1>
          <p>Sistema de Trazabilidad de Alimentos</p>
        </div>

        <div className="nav-menu">
          {paginas.map(pagina => (
            <button
              key={pagina.id}
              className={`nav-item ${paginaActual === pagina.id ? 'activo' : ''}`}
              onClick={() => onChange(pagina.id)}
              title={`${pagina.nombre} - ${pagina.actor}`}
            >
              {pagina.nombre}
              <span className="actor-badge">{pagina.actor}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navegacion;
