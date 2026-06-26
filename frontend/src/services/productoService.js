import api from './api';

export const productoService = {
  registrarProducto: async (datos) => {
    const response = await api.post('/v1/productos/registrar', datos);
    return response.data;
  },

  obtenerProductoPorQR: async (codigoQr) => {
    const response = await api.get(`/v1/productos/qr/${codigoQr}`);
    return response.data;
  },

  obtenerProductosPorProductor: async (productorId) => {
    const response = await api.get(`/v1/productos/productor/${productorId}`);
    return response.data;
  },

  obtenerTrazabilidad: async (productoId) => {
    const response = await api.get(`/v1/productos/${productoId}/trazabilidad`);
    return response.data;
  },
};
