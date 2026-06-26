package com.trazaalimentos.controller;

import com.trazaalimentos.dto.*;
import com.trazaalimentos.service.ProductoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/v1/productos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProductoController {
    
    private final ProductoService productoService;
    
    @PostMapping("/registrar")
    public ResponseEntity<ApiResponse<ProductoDTO>> registrarProducto(
            @Valid @RequestBody RegistrarProductoRequest request,
            Authentication authentication) {
        try {
            // Aquí se obtendría el ID del usuario autenticado
            // Por ahora usaremos un ID de prueba
            Long productorId = 1L;
            ProductoDTO producto = productoService.registrarProducto(request, productorId);
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Producto registrado exitosamente", producto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error(e.getMessage(), 400));
        }
    }
    
    @GetMapping("/qr/{codigoQr}")
    public ResponseEntity<ApiResponse<ProductoDTO>> obtenerProductoPorQR(
            @PathVariable String codigoQr) {
        try {
            ProductoDTO producto = productoService.obtenerProductoPorQR(codigoQr);
            return ResponseEntity.ok(ApiResponse.success("Producto encontrado", producto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(e.getMessage(), 404));
        }
    }
    
    @GetMapping("/productor/{productorId}")
    public ResponseEntity<ApiResponse<List<ProductoDTO>>> obtenerProductosPorProductor(
            @PathVariable Long productorId) {
        try {
            List<ProductoDTO> productos = productoService.obtenerProductosPorProductor(productorId);
            return ResponseEntity.ok(ApiResponse.success("Productos encontrados", productos));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(e.getMessage(), 404));
        }
    }
    
    @GetMapping("/{productoId}/trazabilidad")
    public ResponseEntity<ApiResponse<List<TrazabilidadDTO>>> obtenerTrazabilidad(
            @PathVariable Long productoId) {
        try {
            List<TrazabilidadDTO> trazabilidad = productoService.obtenerTrazabilidadProducto(productoId);
            return ResponseEntity.ok(ApiResponse.success("Trazabilidad obtenida", trazabilidad));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(e.getMessage(), 404));
        }
    }
}
