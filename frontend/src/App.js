import React, { useState } from 'react';
import './App.css';
import Navegacion from './components/Navegacion';
import RegistrarProducto from './components/RegistrarProducto';
import RegistrarTraslado from './components/RegistrarTraslado';
import ConfirmarRecepcion from './components/ConfirmarRecepcion';
import EscanearQR from './components/EscanearQR';
import VerAuditoria from './components/VerAuditoria';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [paginaActual, setPaginaActual] = useState('registrar-producto');

  const renderizarPagina = () => {
    switch(paginaActual) {
      case 'registrar-producto':
        return <RegistrarProducto />;
      case 'registrar-traslado':
        return <RegistrarTraslado />;
      case 'confirmar-recepcion':
        return <ConfirmarRecepcion />;
      case 'escanear-qr':
        return <EscanearQR />;
      case 'ver-auditoria':
        return <VerAuditoria />;
      default:
        return <RegistrarProducto />;
    }
  };

  return (
    <AuthProvider>
      <div className="App">
        <Navegacion paginaActual={paginaActual} onChange={setPaginaActual} />
        <div className="contenido-principal">
          {renderizarPagina()}
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
