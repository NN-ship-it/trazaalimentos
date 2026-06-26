package com.trazaalimentos.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
public class RegistrarProductoRequest {
    
    @NotBlank(message = "El nombre del producto es requerido")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    private String nombre;
    
    @NotBlank(message = "La descripción es requerida")
    @Size(min = 10, max = 500, message = "La descripción debe tener entre 10 y 500 caracteres")
    private String descripcion;
    
    @NotNull(message = "La fecha de producción es requerida")
    private LocalDate fechaProduccion;
    
    @NotNull(message = "La fecha de vencimiento es requerida")
    private LocalDate fechaVencimiento;
    
    @NotBlank(message = "El ID de lote es requerido")
    @Size(min = 3, max = 50, message = "El ID de lote debe tener entre 3 y 50 caracteres")
    private String loteId;
    
    @NotNull(message = "La certificación es requerida")
    private Long certificacionId;
    
    @NotNull(message = "La cantidad es requerida")
    @Min(value = 1, message = "La cantidad debe ser mayor a 0")
    private Integer cantidad;
    
    @NotBlank(message = "La unidad de medida es requerida")
    private String unidadMedida;
}
