package com.trazaalimentos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrazabilidadDTO {
    private Long id;
    private Long productoId;
    private String tipoMovimiento;
    private Long usuarioId;
    private String usuarioNombre;
    private LocalDateTime fechaMovimiento;
    private String origen;
    private String destino;
    private BigDecimal temperatura;
    private String condicionesTransporte;
    private String observaciones;
    private String estadoProducto;
    private String ubicacionActual;
}
