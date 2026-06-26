package com.trazaalimentos.service;

import com.trazaalimentos.dto.AuditoriaDTO;
import com.trazaalimentos.model.Auditoria;
import com.trazaalimentos.repository.AuditoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AuditoriaService {
    
    private final AuditoriaRepository auditoriaRepository;
    
    // OBTENER TODOS LOS REGISTROS DE AUDITORÍA
    public List<AuditoriaDTO> obtenerTodosLosRegistros() {
        return auditoriaRepository.findAllByOrderByFechaAuditoriaDesc()
            .stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }
    
    // OBTENER AUDITORÍA POR USUARIO
    public List<AuditoriaDTO> obtenerAuditoriaUsuario(Long usuarioId) {
        return auditoriaRepository.findByUsuarioIdOrderByFechaAuditoriaDesc(usuarioId)
            .stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }
    
    // OBTENER ÚLTIMAS N ACCIONES
    public List<AuditoriaDTO> obtenerUltimasAcciones(int limite) {
        return auditoriaRepository.findAllByOrderByFechaAuditoriaDesc()
            .stream()
            .limit(limite)
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }
    
    // CONVERTIR A DTO
    private AuditoriaDTO convertirADTO(Auditoria auditoria) {
        AuditoriaDTO dto = new AuditoriaDTO();
        dto.setId(auditoria.getId());
        dto.setUsuarioId(auditoria.getUsuario().getId());
        dto.setUsuarioNombre(auditoria.getUsuario().getEmpresa());
        dto.setAccion(auditoria.getAccion());
        dto.setTablaAfectada(auditoria.getTablaAfectada());
        dto.setIdRegistro(auditoria.getIdRegistro());
        dto.setDetalles(auditoria.getDetalles());
        dto.setIpAddress(auditoria.getIpAddress());
        dto.setFechaAuditoria(auditoria.getFechaAuditoria());
        return dto;
    }
}
