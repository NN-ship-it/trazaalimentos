package com.trazaalimentos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuditoriaDTO {
    private Long id;
    private Long usuarioId;
    private String usuarioNombre;
    private String accion;
    private String tablaAfectada;
    private Integer idRegistro;
    private String detalles;
    private String ipAddress;
    private LocalDateTime fechaAuditoria;
}
