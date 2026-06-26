package com.trazaalimentos.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "auditoria")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Auditoria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @Column(nullable = false, length = 100)
    private String accion;
    
    @Column(length = 50)
    private String tablaAfectada;
    
    @Column
    private Integer idRegistro;
    
    @Column(columnDefinition = "TEXT")
    private String detalles;
    
    @Column(length = 50)
    private String ipAddress;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaAuditoria = LocalDateTime.now();
}
