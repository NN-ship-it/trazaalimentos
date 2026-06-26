import React, { useState } from 'react';
import { productoService } from '../services/productoService';
import './EscanearQR.css';

const EscanearQR = () => {
  const [codigoQR, setCodigoQR] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [productoEncontrado, setProductoEncontrado] = useState(null);
  const [trazabilidad, setTrazabilidad] = useState([]);

  const handleInputChange = (e) => {
    setCodigoQR(e.target.value);
  };

  const buscarProducto = async (e) => {
    e.preventDefault();
    
    if (!codigoQR.trim()) {
      setMensaje({ tipo: 'error', texto: 'Por favor ingresa un código QR' });
      return;
    }

    setCargando(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      const respuesta = await productoService.obtenerProductoPorQR(codigoQR);

      if (respuesta.success) {
        setProductoEncontrado(respuesta.data);
        
        // Obtener trazabilidad del producto
        const trazResp = await productoService.obtenerTrazabilidad(respuesta.data.id);
        if (trazResp.success) {
          setTrazabilidad(trazResp.data);
        }
        
        setMensaje({ tipo: 'exito', texto: 'Producto encontrado' });
      } else {
        setMensaje({ tipo: 'error', texto: 'Producto no encontrado' });
        setProductoEncontrado(null);
        setTrazabilidad([]);
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al buscar el producto' });
      setProductoEncontrado(null);
      setTrazabilidad([]);
    } finally {
      setCargando(false);
    }
  };

  const verificarVencimiento = (fecha) => {
    const today = new Date();
    const vencimiento = new Date(fecha);
    const diasRestantes = Math.floor((vencimiento - today) / (1000 * 60 * 60 * 24));
    
    if (diasRestantes < 0) {
      return { estado: 'VENCIDO', dias: 0, clase: 'vencido' };
    } else if (diasRestantes <= 7) {
      return { estado: 'PROXIMO_A_VENCER', dias: diasRestantes, clase: 'proximo-vencer' };
    } else {
      return { estado: 'VIGENTE', dias: diasRestantes, clase: 'vigente' };
    }
  };

  const resetear = () => {
    setCodigoQR('');
    setProductoEncontrado(null);
    setTrazabilidad([]);
    setMensaje({ tipo: '', texto: '' });
  };

  const vencimiento = productoEncontrado ? verificarVencimiento(productoEncontrado.fechaVencimiento) : null;

  return (
    <div className="escanear-qr-container">
      <div className="escanear-qr">
        <h1>🔍 Escanear Código QR</h1>
        <p className="subtitulo">Ingresa el código QR del producto para ver su información completa</p>

        {mensaje.texto && (
          <div className={`mensaje ${mensaje.tipo}`}>
            {mensaje.texto}
          </div>
        )}

        {!productoEncontrado ? (
          <form onSubmit={buscarProducto} className="formulario-busqueda">
            <div className="campo-busqueda">
              <input
                type="text"
                value={codigoQR}
                onChange={handleInputChange}
                placeholder="Ingresa el código QR o ID de lote del producto"
                disabled={cargando}
              />
              <button type="submit" disabled={cargando}>
                {cargando ? 'Buscando...' : '🔍 Buscar'}
              </button>
            </div>
          </form>
        ) : (
          <div className="resultado-producto">
            <div className={`estado-vencimiento ${vencimiento.clase}`}>
              {vencimiento.estado === 'VENCIDO' && '⚠️ VENCIDO'}
              {vencimiento.estado === 'PROXIMO_A_VENCER' && `⏰ VENCE EN ${vencimiento.dias} DÍAS`}
              {vencimiento.estado === 'VIGENTE' && `✅ VIGENTE (${vencimiento.dias} días)`}
            </div>

            <div className="info-producto">
              <h2>{productoEncontrado.nombre}</h2>
              
              <div className="datos-basicos">
                <div className="dato">
                  <label>Descripción:</label>
                  <p>{productoEncontrado.descripcion}</p>
                </div>

                <div className="datos-grid">
                  <div className="dato">
                    <label>Lote:</label>
                    <p><strong>{productoEncontrado.loteId}</strong></p>
                  </div>
                  <div className="dato">
                    <label>Productor:</label>
                    <p>{productoEncontrado.productorNombre}</p>
                  </div>
                  <div className="dato">
                    <label>Cantidad:</label>
                    <p>{productoEncontrado.cantidad} {productoEncontrado.unidadMedida}</p>
                  </div>
                  <div className="dato">
                    <label>Certificación:</label>
                    <p>{productoEncontrado.certificacionNombre}</p>
                  </div>
                </div>

                <div className="datos-grid">
                  <div className="dato">
                    <label>Fecha de Producción:</label>
                    <p>{new Date(productoEncontrado.fechaProduccion).toLocaleDateString()}</p>
                  </div>
                  <div className="dato">
                    <label>Fecha de Vencimiento:</label>
                    <p className={vencimiento.clase}>
                      {new Date(productoEncontrado.fechaVencimiento).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {trazabilidad.length > 0 && (
              <div className="trazabilidad-section">
                <h3>📍 Historial de Trazabilidad</h3>
                <div className="timeline">
                  {trazabilidad.map((evento, index) => (
                    <div key={evento.id} className="timeline-item">
                      <div className="timeline-marker">
                        <span className={`badge ${evento.tipoMovimiento.toLowerCase()}`}>
                          {evento.tipoMovimiento}
                        </span>
                      </div>
                      <div className="timeline-content">
                        <p className="fecha">
                          {new Date(evento.fechaMovimiento).toLocaleString()}
                        </p>
                        <p className="usuario">👤 {evento.usuarioNombre}</p>
                        {evento.origen && <p>📤 Origen: {evento.origen}</p>}
                        {evento.destino && <p>📥 Destino: {evento.destino}</p>}
                        {evento.ubicacionActual && <p>📍 Ubicación: {evento.ubicacionActual}</p>}
                        {evento.temperatura && <p>🌡️ Temperatura: {evento.temperatura}°C</p>}
                        {evento.estadoProducto && <p>Estado: {evento.estadoProducto}</p>}
                        {evento.observaciones && <p>📝 {evento.observaciones}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={resetear} className="btn-nuevo-busqueda">
              🔄 Escanear Otro Producto
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EscanearQR;
