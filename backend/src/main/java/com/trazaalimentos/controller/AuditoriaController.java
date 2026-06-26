package com.trazaalimentos.controller;

import com.trazaalimentos.dto.*;
import com.trazaalimentos.service.AuditoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/v1/auditoria")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuditoriaController {
    
    private final AuditoriaService auditoriaService;
    
    // OBTENER TODOS LOS REGISTROS DE AUDITORÍA
    @GetMapping("/todos")
    public ResponseEntity<ApiResponse<List<AuditoriaDTO>>> obtenerTodos() {
        try {
            List<AuditoriaDTO> registros = auditoriaService.obtenerTodosLosRegistros();
            return ResponseEntity.ok(ApiResponse.success("Registros de auditoría obtenidos", registros));
        } catch (Exception e) {
            return ResponseEntity.status(404)
                .body(ApiResponse.error(e.getMessage(), 404));
        }
    }
    
    // OBTENER AUDITORÍA POR USUARIO
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<ApiResponse<List<AuditoriaDTO>>> obtenerPorUsuario(
            @PathVariable Long usuarioId) {
        try {
            List<AuditoriaDTO> registros = auditoriaService.obtenerAuditoriaUsuario(usuarioId);
            return ResponseEntity.ok(ApiResponse.success("Auditoría del usuario obtenida", registros));
        } catch (Exception e) {
            return ResponseEntity.status(404)
                .body(ApiResponse.error(e.getMessage(), 404));
        }
    }
    
    // OBTENER ÚLTIMAS N ACCIONES
    @GetMapping("/ultimas")
    public ResponseEntity<ApiResponse<List<AuditoriaDTO>>> obtenerUltimas(
            @RequestParam(defaultValue = "50") int limite) {
        try {
            List<AuditoriaDTO> registros = auditoriaService.obtenerUltimasAcciones(limite);
            return ResponseEntity.ok(ApiResponse.success("Últimas acciones obtenidas", registros));
        } catch (Exception e) {
            return ResponseEntity.status(404)
                .body(ApiResponse.error(e.getMessage(), 404));
        }
    }
}
