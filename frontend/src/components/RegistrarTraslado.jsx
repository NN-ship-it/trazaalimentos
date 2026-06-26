import React, { useState } from 'react';
import './RegistrarTraslado.css';

const RegistrarTraslado = () => {
  const [formData, setFormData] = useState({
    productoId: '',
    origen: '',
    destino: '',
    temperatura: '',
    condiciones: '',
    observaciones: '',
  });

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [trasladoRegistrado, setTrasladoRegistrado] = useState(null);

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
    if (!formData.origen.trim()) {
      setMensaje({ tipo: 'error', texto: 'El origen es requerido' });
      return false;
    }
    if (!formData.destino.trim()) {
      setMensaje({ tipo: 'error', texto: 'El destino es requerido' });
      return false;
    }
    if (formData.temperatura && (formData.temperatura < -50 || formData.temperatura > 60)) {
      setMensaje({ tipo: 'error', texto: 'La temperatura debe estar entre -50°C y 60°C' });
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
      // Simulamos la respuesta del servidor
      setTimeout(() => {
        setTrasladoRegistrado({
          id: Math.random(),
          ...formData,
          fecha: new Date().toLocaleString(),
        });
        setMensaje({ tipo: 'exito', texto: 'Traslado registrado exitosamente' });
        setCargando(false);
      }, 1000);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al registrar el traslado' });
      setCargando(false);
    }
  };

  return (
    <div className="registrar-traslado-container">
      <div className="registrar-traslado">
        <h1>🚚 Registrar Traslado</h1>
        <p className="subtitulo">Registra el movimiento del producto durante la distribución</p>

        {mensaje.texto && (
          <div className={`mensaje ${mensaje.tipo}`}>
            {mensaje.texto}
          </div>
        )}

        {!trasladoRegistrado ? (
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

            <div className="grupo-campos dos-columnas">
              <div className="campo">
                <label htmlFor="origen">Origen *</label>
                <input
                  type="text"
                  id="origen"
                  name="origen"
                  value={formData.origen}
                  onChange={handleChange}
                  placeholder="Ej: Productor en Lima"
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="destino">Destino *</label>
                <input
                  type="text"
                  id="destino"
                  name="destino"
                  value={formData.destino}
                  onChange={handleChange}
                  placeholder="Ej: Centro de Distribución"
                  required
                />
              </div>
            </div>

            <div className="grupo-campos dos-columnas">
              <div className="campo">
                <label htmlFor="temperatura">Temperatura (°C)</label>
                <input
                  type="number"
                  id="temperatura"
                  name="temperatura"
                  value={formData.temperatura}
                  onChange={handleChange}
                  placeholder="15"
                  step="0.1"
                  min="-50"
                  max="60"
                />
              </div>

              <div className="campo">
                <label htmlFor="condiciones">Condiciones de Transporte</label>
                <input
                  type="text"
                  id="condiciones"
                  name="condiciones"
                  value={formData.condiciones}
                  onChange={handleChange}
                  placeholder="Ej: Refrigerado, Protegido de luz"
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
                  placeholder="Notas adicionales sobre el traslado"
                  rows="3"
                />
              </div>
            </div>

            <button type="submit" className="btn-registrar" disabled={cargando}>
              {cargando ? 'Registrando...' : '✓ Registrar Traslado'}
            </button>
          </form>
        ) : (
          <div className="confirmacion">
            <h2>✓ Traslado Registrado Exitosamente</h2>
            <div className="detalle-traslado">
              <p><strong>Producto ID:</strong> {trasladoRegistrado.productoId}</p>
              <p><strong>Origen:</strong> {trasladoRegistrado.origen}</p>
              <p><strong>Destino:</strong> {trasladoRegistrado.destino}</p>
              {trasladoRegistrado.temperatura && (
                <p><strong>Temperatura:</strong> {trasladoRegistrado.temperatura}°C</p>
              )}
              {trasladoRegistrado.condiciones && (
                <p><strong>Condiciones:</strong> {trasladoRegistrado.condiciones}</p>
              )}
              <p><strong>Fecha:</strong> {trasladoRegistrado.fecha}</p>
            </div>

            <button 
              onClick={() => {
                setTrasladoRegistrado(null);
                setFormData({
                  productoId: '',
                  origen: '',
                  destino: '',
                  temperatura: '',
                  condiciones: '',
                  observaciones: '',
                });
                setMensaje({ tipo: '', texto: '' });
              }}
              className="btn-nuevo"
            >
              Registrar otro traslado
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrarTraslado;
