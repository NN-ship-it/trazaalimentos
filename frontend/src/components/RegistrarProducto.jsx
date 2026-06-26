import React, { useState } from 'react';
import { productoService } from '../services/productoService';
import './RegistrarProducto.css';

const RegistrarProducto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fechaProduccion: '',
    fechaVencimiento: '',
    loteId: '',
    certificacionId: '',
    cantidad: '',
    unidadMedida: 'kg',
  });

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [productoRegistrado, setProductoRegistrado] = useState(null);

  const certificaciones = [
    { id: 1, nombre: 'BPA - Buenas Prácticas Agrícolas' },
    { id: 2, nombre: 'HACCP' },
  ];

  const unidades = ['kg', 'g', 'l', 'ml', 'unidades', 'cajas'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarFormulario = () => {
    if (!formData.nombre.trim()) {
      setMensaje({ tipo: 'error', texto: 'El nombre del producto es requerido' });
      return false;
    }
    if (!formData.descripcion.trim()) {
      setMensaje({ tipo: 'error', texto: 'La descripción es requerida' });
      return false;
    }
    if (!formData.fechaProduccion) {
      setMensaje({ tipo: 'error', texto: 'La fecha de producción es requerida' });
      return false;
    }
    if (!formData.fechaVencimiento) {
      setMensaje({ tipo: 'error', texto: 'La fecha de vencimiento es requerida' });
      return false;
    }
    if (new Date(formData.fechaVencimiento) <= new Date(formData.fechaProduccion)) {
      setMensaje({ tipo: 'error', texto: 'La fecha de vencimiento debe ser posterior a la de producción' });
      return false;
    }
    if (!formData.loteId.trim()) {
      setMensaje({ tipo: 'error', texto: 'El ID de lote es requerido' });
      return false;
    }
    if (!formData.certificacionId) {
      setMensaje({ tipo: 'error', texto: 'La certificación es requerida' });
      return false;
    }
    if (!formData.cantidad || formData.cantidad <= 0) {
      setMensaje({ tipo: 'error', texto: 'La cantidad debe ser mayor a 0' });
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
      const datos = {
        ...formData,
        certificacionId: parseInt(formData.certificacionId),
        cantidad: parseInt(formData.cantidad),
      };

      const respuesta = await productoService.registrarProducto(datos);

      if (respuesta.success) {
        setMensaje({ tipo: 'exito', texto: 'Producto registrado exitosamente' });
        setProductoRegistrado(respuesta.data);
        setFormData({
          nombre: '',
          descripcion: '',
          fechaProduccion: '',
          fechaVencimiento: '',
          loteId: '',
          certificacionId: '',
          cantidad: '',
          unidadMedida: 'kg',
        });
      } else {
        setMensaje({ tipo: 'error', texto: respuesta.message || 'Error al registrar el producto' });
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.response?.data?.message || 'Error en la conexión' });
    } finally {
      setCargando(false);
    }
  };

  const descargarQR = () => {
    if (productoRegistrado?.codigoQr) {
      const link = document.createElement('a');
      link.href = 'data:image/png;base64,' + productoRegistrado.codigoQr;
      link.download = `qr-${productoRegistrado.loteId}.png`;
      link.click();
    }
  };

  return (
    <div className="registrar-producto-container">
      <div className="registrar-producto">
        <h1>Registrar Nuevo Producto</h1>

        {mensaje.texto && (
          <div className={`mensaje ${mensaje.tipo}`}>
            {mensaje.texto}
          </div>
        )}

        {!productoRegistrado ? (
          <form onSubmit={handleSubmit} className="formulario">
            <div className="grupo-campos">
              <div className="campo">
                <label htmlFor="nombre">Nombre del Producto *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Tomates Frescos"
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="descripcion">Descripción *</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción detallada del producto"
                  rows="3"
                  required
                />
              </div>
            </div>

            <div className="grupo-campos dos-columnas">
              <div className="campo">
                <label htmlFor="fechaProduccion">Fecha de Producción *</label>
                <input
                  type="date"
                  id="fechaProduccion"
                  name="fechaProduccion"
                  value={formData.fechaProduccion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="fechaVencimiento">Fecha de Vencimiento *</label>
                <input
                  type="date"
                  id="fechaVencimiento"
                  name="fechaVencimiento"
                  value={formData.fechaVencimiento}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grupo-campos dos-columnas">
              <div className="campo">
                <label htmlFor="loteId">ID de Lote *</label>
                <input
                  type="text"
                  id="loteId"
                  name="loteId"
                  value={formData.loteId}
                  onChange={handleChange}
                  placeholder="Ej: LOTE-2024-001"
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="certificacionId">Certificación *</label>
                <select
                  id="certificacionId"
                  name="certificacionId"
                  value={formData.certificacionId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Seleccionar --</option>
                  {certificaciones.map(cert => (
                    <option key={cert.id} value={cert.id}>{cert.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grupo-campos dos-columnas">
              <div className="campo">
                <label htmlFor="cantidad">Cantidad *</label>
                <input
                  type="number"
                  id="cantidad"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  placeholder="0"
                  min="1"
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="unidadMedida">Unidad de Medida *</label>
                <select
                  id="unidadMedida"
                  name="unidadMedida"
                  value={formData.unidadMedida}
                  onChange={handleChange}
                  required
                >
                  {unidades.map(unidad => (
                    <option key={unidad} value={unidad}>{unidad}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn-registrar" disabled={cargando}>
              {cargando ? 'Registrando...' : 'Registrar Producto'}
            </button>
          </form>
        ) : (
          <div className="confirmacion">
            <h2>✓ Producto Registrado Exitosamente</h2>
            <div className="detalle-producto">
              <p><strong>Nombre:</strong> {productoRegistrado.nombre}</p>
              <p><strong>Lote:</strong> {productoRegistrado.loteId}</p>
              <p><strong>Cantidad:</strong> {productoRegistrado.cantidad} {productoRegistrado.unidadMedida}</p>
              <p><strong>Certificación:</strong> {productoRegistrado.certificacionNombre}</p>
              <p><strong>Fecha Vencimiento:</strong> {new Date(productoRegistrado.fechaVencimiento).toLocaleDateString()}</p>
            </div>
            
            <div className="qr-section">
              <h3>Código QR del Producto</h3>
              {productoRegistrado.codigoQr && (
                <img 
                  src={`data:image/png;base64,${productoRegistrado.codigoQr}`} 
                  alt="QR Code" 
                  className="qr-code"
                />
              )}
              <button onClick={descargarQR} className="btn-descargar">
                Descargar QR
              </button>
            </div>

            <button 
              onClick={() => {
                setProductoRegistrado(null);
                setMensaje({ tipo: '', texto: '' });
              }}
              className="btn-nuevo"
            >
              Registrar otro producto
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrarProducto;
