import React, { useState } from 'react';
import './VerAuditoria.css';

const VerAuditoria = () => {
  const [registros, setRegistros] = useState([
    {
      id: 1,
      usuario: 'Juan Productor',
      accion: 'REGISTRAR_PRODUCTO',
      tabla: 'productos',
      detalles: 'Se registró producto: Tomates Frescos',
      fecha: '2024-06-26 10:30:00',
    },
    {
      id: 2,
      usuario: 'María Distribuidor',
      accion: 'REGISTRAR_TRASLADO',
      tabla: 'trazabilidad',
      detalles: 'Traslado de Lima a Callao',
      fecha: '2024-06-26 12:45:00',
    },
    {
      id: 3,
      usuario: 'Carlos Comerciante',
      accion: 'CONFIRMAR_RECEPCION',
      tabla: 'trazabilidad',
      detalles: 'Recepción confirmada en Almacén Central',
      fecha: '2024-06-26 15:20:00',
    },
  ]);

  const [filtroAccion, setFiltroAccion] = useState('TODOS');
  const [filtroFecha, setFiltroFecha] = useState('TODOS');

  const acciones = ['TODOS', 'REGISTRAR_PRODUCTO', 'REGISTRAR_TRASLADO', 'CONFIRMAR_RECEPCION', 'AUDITAR'];

  const filtrarRegistros = () => {
    let resultado = registros;

    if (filtroAccion !== 'TODOS') {
      resultado = resultado.filter(r => r.accion === filtroAccion);
    }

    return resultado;
  };

  const registrosFiltrados = filtrarRegistros();

  const getColorAccion = (accion) => {
    switch(accion) {
      case 'REGISTRAR_PRODUCTO':
        return 'producto';
      case 'REGISTRAR_TRASLADO':
        return 'traslado';
      case 'CONFIRMAR_RECEPCION':
        return 'recepcion';
      case 'AUDITAR':
        return 'auditoria';
      default:
        return 'default';
    }
  };

  const getIconoAccion = (accion) => {
    switch(accion) {
      case 'REGISTRAR_PRODUCTO':
        return '📝';
      case 'REGISTRAR_TRASLADO':
        return '🚚';
      case 'CONFIRMAR_RECEPCION':
        return '📦';
      case 'AUDITAR':
        return '🔍';
      default:
        return '⚙️';
    }
  };

  return (
    <div className="ver-auditoria-container">
      <div className="ver-auditoria">
        <h1>🔍 Auditoría de Sistema</h1>
        <p className="subtitulo">Visualiza todas las acciones realizadas en el sistema</p>

        <div className="filtros">
          <div className="filtro">
            <label htmlFor="filtroAccion">Filtrar por Acción:</label>
            <select
              id="filtroAccion"
              value={filtroAccion}
              onChange={(e) => setFiltroAccion(e.target.value)}
            >
              {acciones.map(accion => (
                <option key={accion} value={accion}>
                  {accion === 'TODOS' ? 'Todas las acciones' : accion.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div className="info-filtro">
            Mostrando <strong>{registrosFiltrados.length}</strong> registros
          </div>
        </div>

        {registrosFiltrados.length > 0 ? (
          <div className="tabla-auditoria">
            <table>
              <thead>
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Usuario</th>
                  <th>Acción</th>
                  <th>Tabla</th>
                  <th>Detalles</th>
                </tr>
              </thead>
              <tbody>
                {registrosFiltrados.map(registro => (
                  <tr key={registro.id} className={`fila-${getColorAccion(registro.accion)}`}>
                    <td className="fecha">{registro.fecha}</td>
                    <td className="usuario">👤 {registro.usuario}</td>
                    <td className="accion">
                      <span className={`badge ${getColorAccion(registro.accion)}`}>
                        {getIconoAccion(registro.accion)} {registro.accion.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="tabla">{registro.tabla}</td>
                    <td className="detalles">{registro.detalles}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="sin-resultados">
            <p>No hay registros de auditoría que coincidan con los filtros seleccionados.</p>
          </div>
        )}

        <div className="resumen-auditoria">
          <h3>📊 Resumen de Auditoría</h3>
          <div className="estadisticas">
            <div className="stat">
              <span className="numero">{registros.filter(r => r.accion === 'REGISTRAR_PRODUCTO').length}</span>
              <span className="label">Productos Registrados</span>
            </div>
            <div className="stat">
              <span className="numero">{registros.filter(r => r.accion === 'REGISTRAR_TRASLADO').length}</span>
              <span className="label">Traslados Registrados</span>
            </div>
            <div className="stat">
              <span className="numero">{registros.filter(r => r.accion === 'CONFIRMAR_RECEPCION').length}</span>
              <span className="label">Recepciones Confirmadas</span>
            </div>
            <div className="stat">
              <span className="numero">{registros.length}</span>
              <span className="label">Total de Acciones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerAuditoria;
