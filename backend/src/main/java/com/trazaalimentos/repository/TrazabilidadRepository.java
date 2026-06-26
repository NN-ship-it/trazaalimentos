package com.trazaalimentos.repository;

import com.trazaalimentos.model.Trazabilidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TrazabilidadRepository extends JpaRepository<Trazabilidad, Long> {
    List<Trazabilidad> findByProductoId(Long productoId);
    List<Trazabilidad> findByProductoIdOrderByFechaMovimientoDesc(Long productoId);
}
