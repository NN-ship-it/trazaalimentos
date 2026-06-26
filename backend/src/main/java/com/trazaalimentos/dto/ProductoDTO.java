package com.trazaalimentos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private LocalDate fechaProduccion;
    private LocalDate fechaVencimiento;
    private String loteId;
    private Long certificacionId;
    private String certificacionNombre;
    private Integer cantidad;
    private String unidadMedida;
    private String codigoQr;
    private String estado;
    private Long productorId;
    private String productorNombre;
    private LocalDateTime fechaCreacion;
}
