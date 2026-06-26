package com.trazaalimentos.service;

import com.trazaalimentos.dto.AuditoriaDTO;
import com.trazaalimentos.dto.ConfirmarRecepcionRequest;
import com.trazaalimentos.dto.TrazabilidadDTO;
import com.trazaalimentos.model.Producto;
import com.trazaalimentos.model.Usuario;
import com.trazaalimentos.model.Trazabilidad;
import com.trazaalimentos.model.Auditoria;
import com.trazaalimentos.repository.ProductoRepository;
import com.trazaalimentos.repository.UsuarioRepository;
import com.trazaalimentos.repository.TrazabilidadRepository;
import com.trazaalimentos.repository.AuditoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TrazabilidadService {
    
    private final TrazabilidadRepository trazabilidadRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;
    private final AuditoriaRepository auditoriaRepository;
    
    // REGISTRAR TRASLADO (DISTRIBUIDOR)
    public TrazabilidadDTO registrarTraslado(Long productoId, String origen, String destino, 
                                              String temperatura, String condiciones, 
                                              String observaciones, Long distribuidorId) throws Exception {
        
        // Validar producto
        Producto producto = productoRepository.findById(productoId)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        // Validar distribuidor
        Usuario distribuidor = usuarioRepository.findById(distribuidorId)
            .orElseThrow(() -> new RuntimeException("Distribuidor no encontrado"));
        
        if (!distribuidor.getRol().equals(Usuario.RolUsuario.DISTRIBUIDOR)) {
            throw new RuntimeException("Solo los distribuidores pueden registrar traslados");
        }
        
        // Crear registro de trazabilidad
        Trazabilidad trazabilidad = new Trazabilidad();
        trazabilidad.setProducto(producto);
        trazabilidad.setTipoMovimiento(Trazabilidad.TipoMovimiento.TRASLADO);
        trazabilidad.setUsuario(distribuidor);
        trazabilidad.setOrigen(origen);
        trazabilidad.setDestino(destino);
        trazabilidad.setTemperatura(temperatura != null ? new java.math.BigDecimal(temperatura) : null);
        trazabilidad.setCondicionesTransporte(condiciones);
        trazabilidad.setObservaciones(observaciones);
        trazabilidad.setUbicacionActual(destino);
        trazabilidad.setEstadoProducto("EN_TRANSITO");
        
        Trazabilidad guardado = trazabilidadRepository.save(trazabilidad);
        
        // Registrar en auditoría
        registrarAuditoria(distribuidor, "REGISTRAR_TRASLADO", "trazabilidad", 
            guardado.getId(), "Traslado de " + origen + " a " + destino);
        
        return convertirATrazabilidadDTO(guardado);
    }
    
    // CONFIRMAR RECEPCIÓN (COMERCIANTE)
    public TrazabilidadDTO confirmarRecepcion(ConfirmarRecepcionRequest request, Long comercianteId) throws Exception {
        
        // Validar producto
        Producto producto = productoRepository.findById(request.getProductoId())
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        // Validar comerciante
        Usuario comerciante = usuarioRepository.findById(comercianteId)
            .orElseThrow(() -> new RuntimeException("Comerciante no encontrado"));
        
        if (!comerciante.getRol().equals(Usuario.RolUsuario.COMERCIANTE)) {
            throw new RuntimeException("Solo los comerciantes pueden confirmar recepción");
        }
        
        // Crear registro de recepción
        Trazabilidad trazabilidad = new Trazabilidad();
        trazabilidad.setProducto(producto);
        trazabilidad.setTipoMovimiento(Trazabilidad.TipoMovimiento.RECEPCION);
        trazabilidad.setUsuario(comerciante);
        trazabilidad.setEstadoProducto(request.getEstadoProducto());
        trazabilidad.setUbicacionActual(request.getUbicacionActual());
        trazabilidad.setObservaciones(request.getObservaciones());
        
        Trazabilidad guardado = trazabilidadRepository.save(trazabilidad);
        
        // Actualizar estado del producto
        if ("RECHAZADO".equalsIgnoreCase(request.getEstadoProducto())) {
            producto.setEstado(Producto.EstadoProducto.RECHAZADO);
        }
        productoRepository.save(producto);
        
        // Registrar en auditoría
        registrarAuditoria(comerciante, "CONFIRMAR_RECEPCION", "trazabilidad", 
            guardado.getId(), "Recepción confirmada en " + request.getUbicacionActual());
        
        return convertirATrazabilidadDTO(guardado);
    }
    
    // OBTENER HISTORIAL COMPLETO DE UN PRODUCTO
    public List<TrazabilidadDTO> obtenerHistorialCompleto(Long productoId) {
        return trazabilidadRepository.findByProductoIdOrderByFechaMovimientoDesc(productoId)
            .stream()
            .map(this::convertirATrazabilidadDTO)
            .collect(Collectors.toList());
    }
    
    // REGISTRAR AUDITORÍA
    private void registrarAuditoria(Usuario usuario, String accion, String tabla, 
                                    Integer idRegistro, String detalles) {
        Auditoria auditoria = new Auditoria();
        auditoria.setUsuario(usuario);
        auditoria.setAccion(accion);
        auditoria.setTablaAfectada(tabla);
        auditoria.setIdRegistro(idRegistro);
        auditoria.setDetalles(detalles);
        auditoria.setIpAddress("127.0.0.1"); // En producción, obtener del request
        auditoriaRepository.save(auditoria);
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
