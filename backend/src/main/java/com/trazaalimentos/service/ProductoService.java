package com.trazaalimentos.service;

import com.trazaalimentos.dto.ProductoDTO;
import com.trazaalimentos.dto.RegistrarProductoRequest;
import com.trazaalimentos.model.Producto;
import com.trazaalimentos.model.Usuario;
import com.trazaalimentos.model.Certificacion;
import com.trazaalimentos.model.Trazabilidad;
import com.trazaalimentos.repository.ProductoRepository;
import com.trazaalimentos.repository.UsuarioRepository;
import com.trazaalimentos.repository.CertificacionRepository;
import com.trazaalimentos.repository.TrazabilidadRepository;
import com.trazaalimentos.util.QRCodeGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductoService {
    
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;
    private final CertificacionRepository certificacionRepository;
    private final TrazabilidadRepository trazabilidadRepository;
    private final QRCodeGenerator qrCodeGenerator;
    
    public ProductoDTO registrarProducto(RegistrarProductoRequest request, Long productorId) throws Exception {
        // Validar que el usuario sea productor
        Usuario productor = usuarioRepository.findById(productorId)
            .orElseThrow(() -> new RuntimeException("Productor no encontrado"));
        
        if (!productor.getRol().equals(Usuario.RolUsuario.PRODUCTOR)) {
            throw new RuntimeException("Solo los productores pueden registrar productos");
        }
        
        // Validar certificación
        Certificacion certificacion = certificacionRepository.findById(request.getCertificacionId())
            .orElseThrow(() -> new RuntimeException("Certificación no encontrada"));
        
        // Validar que el lote no exista
        if (productoRepository.findByLoteId(request.getLoteId()).isPresent()) {
            throw new RuntimeException("El lote ya está registrado");
        }
        
        // Crear producto
        Producto producto = new Producto();
        producto.setProductor(productor);
        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setFechaProduccion(request.getFechaProduccion());
        producto.setFechaVencimiento(request.getFechaVencimiento());
        producto.setLoteId(request.getLoteId());
        producto.setCertificacion(certificacion);
        producto.setCantidad(request.getCantidad());
        producto.setUnidadMedida(request.getUnidadMedida());
        
        // Generar código QR
        String codigoQr = qrCodeGenerator.generarCodigoQR(request.getLoteId());
        producto.setCodigoQr(codigoQr);
        
        // Guardar producto
        Producto productoGuardado = productoRepository.save(producto);
        
        // Registrar en trazabilidad (PRODUCCION)
        Trazabilidad trazabilidad = new Trazabilidad();
        trazabilidad.setProducto(productoGuardado);
        trazabilidad.setTipoMovimiento(Trazabilidad.TipoMovimiento.PRODUCCION);
        trazabilidad.setUsuario(productor);
        trazabilidad.setUbicacionActual("Productor: " + productor.getEmpresa());
        trazabilidad.setEstadoProducto("PRODUCIDO");
        trazabilidadRepository.save(trazabilidad);
        
        return convertirADTO(productoGuardado);
    }
    
    public ProductoDTO obtenerProductoPorQR(String codigoQr) {
        Producto producto = productoRepository.findByCodigoQr(codigoQr)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return convertirADTO(producto);
    }
    
    public List<ProductoDTO> obtenerProductosPorProductor(Long productorId) {
        return productoRepository.findByProductorId(productorId)
            .stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }
    
    public List<TrazabilidadDTO> obtenerTrazabilidadProducto(Long productoId) {
        return trazabilidadRepository.findByProductoIdOrderByFechaMovimientoDesc(productoId)
            .stream()
            .map(this::convertirATrazabilidadDTO)
            .collect(Collectors.toList());
    }
    
    private ProductoDTO convertirADTO(Producto producto) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(producto.getId());
        dto.setNombre(producto.getNombre());
        dto.setDescripcion(producto.getDescripcion());
        dto.setFechaProduccion(producto.getFechaProduccion());
        dto.setFechaVencimiento(producto.getFechaVencimiento());
        dto.setLoteId(producto.getLoteId());
        dto.setCertificacionId(producto.getCertificacion().getId());
        dto.setCertificacionNombre(producto.getCertificacion().getNombre());
        dto.setCantidad(producto.getCantidad());
        dto.setUnidadMedida(producto.getUnidadMedida());
        dto.setCodigoQr(producto.getCodigoQr());
        dto.setEstado(producto.getEstado().toString());
        dto.setProductorId(producto.getProductor().getId());
        dto.setProductorNombre(producto.getProductor().getEmpresa());
        dto.setFechaCreacion(producto.getFechaCreacion());
        return dto;
    }
    
    private TrazabilidadDTO convertirATrazabilidadDTO(Trazabilidad trazabilidad) {
        TrazabilidadDTO dto = new TrazabilidadDTO();
        dto.setId(trazabilidad.getId());
        dto.setProductoId(trazabilidad.getProducto().getId());
        dto.setTipoMovimiento(trazabilidad.getTipoMovimiento().toString());
        dto.setUsuarioId(trazabilidad.getUsuario().getId());
        dto.setUsuarioNombre(trazabilidad.getUsuario().getEmpresa());
        dto.setFechaMovimiento(trazabilidad.getFechaMovimiento());
        dto.setOrigen(trazabilidad.getOrigen());
        dto.setDestino(trazabilidad.getDestino());
        dto.setTemperatura(trazabilidad.getTemperatura());
        dto.setCondicionesTransporte(trazabilidad.getCondicionesTransporte());
        dto.setObservaciones(trazabilidad.getObservaciones());
        dto.setEstadoProducto(trazabilidad.getEstadoProducto());
        dto.setUbicacionActual(trazabilidad.getUbicacionActual());
        return dto;
    }
}
