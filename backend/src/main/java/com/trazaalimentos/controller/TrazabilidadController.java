package com.trazaalimentos.controller;

import com.trazaalimentos.dto.*;
import com.trazaalimentos.service.TrazabilidadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/v1/trazabilidad")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TrazabilidadController {
    
    private final TrazabilidadService trazabilidadService;
    
    // REGISTRAR TRASLADO (DISTRIBUIDOR)
    @PostMapping("/registrar-traslado")
    public ResponseEntity<ApiResponse<TrazabilidadDTO>> registrarTraslado(
            @RequestParam String origen,
            @RequestParam String destino,
            @RequestParam Long productoId,
            @RequestParam(required = false) String temperatura,
            @RequestParam(required = false) String condiciones,
            @RequestParam(required = false) String observaciones) {
        try {
            // En producción, obtener del usuario autenticado
            Long distribuidorId = 2L;
            TrazabilidadDTO trazabilidad = trazabilidadService.registrarTraslado(
                productoId, origen, destino, temperatura, condiciones, observaciones, distribuidorId);
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Traslado registrado exitosamente", trazabilidad));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error(e.getMessage(), 400));
        }
    }
    
    // CONFIRMAR RECEPCIÓN (COMERCIANTE)
    @PostMapping("/confirmar-recepcion")
    public ResponseEntity<ApiResponse<TrazabilidadDTO>> confirmarRecepcion(
            @Valid @RequestBody ConfirmarRecepcionRequest request) {
        try {
            // En producción, obtener del usuario autenticado
            Long comercianteId = 3L;
            TrazabilidadDTO trazabilidad = trazabilidadService.confirmarRecepcion(request, comercianteId);
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Recepción confirmada exitosamente", trazabilidad));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error(e.getMessage(), 400));
        }
    }
    
    // OBTENER HISTORIAL DE UN PRODUCTO
    @GetMapping("/historial/{productoId}")
    public ResponseEntity<ApiResponse<List<TrazabilidadDTO>>> obtenerHistorial(
            @PathVariable Long productoId) {
        try {
            List<TrazabilidadDTO> historial = trazabilidadService.obtenerHistorialCompleto(productoId);
            return ResponseEntity.ok(ApiResponse.success("Historial obtenido", historial));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(e.getMessage(), 404));
        }
    }
}
