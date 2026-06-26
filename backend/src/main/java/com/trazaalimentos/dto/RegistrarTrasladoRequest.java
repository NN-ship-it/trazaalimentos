package com.trazaalimentos.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class RegistrarTrasladoRequest {
    
    @NotNull(message = "El ID del producto es requerido")
    private Long productoId;
    
    @NotBlank(message = "El origen es requerido")
    private String origen;
    
    @NotBlank(message = "El destino es requerido")
    private String destino;
    
    @Min(value = -50, message = "La temperatura no puede ser menor a -50°C")
    @Max(value = 60, message = "La temperatura no puede ser mayor a 60°C")
    private BigDecimal temperatura;
    
    @Size(max = 500, message = "Las condiciones de transporte no pueden exceder 500 caracteres")
    private String condicionesTransporte;
    
    @Size(max = 500, message = "Las observaciones no pueden exceder 500 caracteres")
    private String observaciones;
}
