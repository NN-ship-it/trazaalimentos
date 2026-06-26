import React, { useState } from 'react';
import './ConfirmarRecepcion.css';

const ConfirmarRecepcion = () => {
  const [formData, setFormData] = useState({
    productoId: '',
    estadoProducto: 'ACEPTADO',
    ubicacionActual: '',
    observaciones: '',
  });

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [recepcionRegistrada, setRecepcionRegistrada] = useState(null);

  const estados = ['ACEPTADO', 'DEFECTUOSO', 'PARCIALMENTE_DAÑADO', 'RECHAZADO'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarFormulario = () => {
    if (!formData.productoId) {
      setMensaje({ tipo: 'error', texto: 'El ID del producto es requerido' });
      return false;
    }
    if (!formData.ubicacionActual.trim()) {
      setMensaje({ tipo: 'error', texto: 'La ubicación actual es requerida' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setCargando(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      setTimeout(() => {
        setRecepcionRegistrada({
          id: Math.random(),
          ...formData,
          fecha: new Date().toLocaleString(),
        });
        setMensaje({ tipo: 'exito', texto: 'Recepción confirmada exitosamente' });
        setCargando(false);
      }, 1000);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al confirmar la recepción' });
      setCargando(false);
    }
  };

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'ACEPTADO':
        return 'aceptado';
      case 'DEFECTUOSO':
        return 'defectuoso';
      case 'PARCIALMENTE_DAÑADO':
        return 'parcial';
      case 'RECHAZADO':
        return 'rechazado';
      default:
        return '';
    }
  };

  return (
    <div className="confirmar-recepcion-container">
      <div className="confirmar-recepcion">
        <h1>📦 Confirmar Recepción</h1>
        <p className="subtitulo">Registra la llegada del producto al punto de venta</p>

        {mensaje.texto && (
          <div className={`mensaje ${mensaje.tipo}`}>
            {mensaje.texto}
          </div>
        )}

        {!recepcionRegistrada ? (
          <form onSubmit={handleSubmit} className="formulario">
            <div className="grupo-campos">
              <div className="campo">
                <label htmlFor="productoId">ID del Producto *</label>
                <input
                  type="number"
                  id="productoId"
                  name="productoId"
                  value={formData.productoId}
                  onChange={handleChange}
                  placeholder="ID del producto"
                  required
                />
              </div>
            </div>

            <div className="grupo-campos">
              <div className="campo">
                <label htmlFor="estadoProducto">Estado del Producto *</label>
                <select
                  id="estadoProducto"
                  name="estadoProducto"
                  value={formData.estadoProducto}
                  onChange={handleChange}
                  required
                >
                  {estados.map(estado => (
                    <option key={estado} value={estado}>
                      {estado.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {formData.estadoProducto !== 'ACEPTADO' && (
              <div className={`alerta ${getEstadoColor(formData.estadoProducto)}`}>
                ⚠️ Estado: {formData.estadoProducto.replace(/_/g, ' ')}
              </div>
            )}

            <div className="grupo-campos">
              <div className="campo">
                <label htmlFor="ubicacionActual">Ubicación Actual *</label>
                <input
                  type="text"
                  id="ubicacionActual"
                  name="ubicacionActual"
                  value={formData.ubicacionActual}
                  onChange={handleChange}
                  placeholder="Ej: Almacén Central, Estante A1"
                  required
                />
              </div>
            </div>

            <div className="grupo-campos">
              <div className="campo">
                <label htmlFor="observaciones">Observaciones</label>
                <textarea
                  id="observaciones"
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleChange}
                  placeholder="Notas sobre el estado del producto"
                  rows="3"
                />
              </div>
            </div>

            <button type="submit" className="btn-registrar" disabled={cargando}>
              {cargando ? 'Registrando...' : '✓ Confirmar Recepción'}
            </button>
          </form>
        ) : (
          <div className="confirmacion">
            <h2>✓ Recepción Confirmada</h2>
            <div className={`detalle-recepcion estado-${getEstadoColor(recepcionRegistrada.estadoProducto)}`}>
              <p><strong>Producto ID:</strong> {recepcionRegistrada.productoId}</p>
              <p><strong>Estado:</strong> {recepcionRegistrada.estadoProducto.replace(/_/g, ' ')}</p>
              <p><strong>Ubicación:</strong> {recepcionRegistrada.ubicacionActual}</p>
              {recepcionRegistrada.observaciones && (
                <p><strong>Observaciones:</strong> {recepcionRegistrada.observaciones}</p>
              )}
              <p><strong>Fecha:</strong> {recepcionRegistrada.fecha}</p>
            </div>

            <button 
              onClick={() => {
                setRecepcionRegistrada(null);
                setFormData({
                  productoId: '',
                  estadoProducto: 'ACEPTADO',
                  ubicacionActual: '',
                  observaciones: '',
                });
                setMensaje({ tipo: '', texto: '' });
              }}
              className="btn-nuevo"
            >
              Registrar otra recepción
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmarRecepcion;
