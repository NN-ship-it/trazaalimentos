package com.trazaalimentos.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ConfirmarRecepcionRequest {
    
    @NotNull(message = "El ID del producto es requerido")
    private Long productoId;
    
    @NotBlank(message = "El estado del producto es requerido")
    private String estadoProducto;
    
    @Size(max = 500, message = "Las observaciones no pueden exceder 500 caracteres")
    private String observaciones;
    
    @NotBlank(message = "La ubicación actual es requerida")
    private String ubicacionActual;
}
