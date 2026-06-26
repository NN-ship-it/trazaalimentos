package com.trazaalimentos.repository;

import com.trazaalimentos.model.Auditoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AuditoriaRepository extends JpaRepository<Auditoria, Long> {
    List<Auditoria> findByUsuarioIdOrderByFechaAuditoriaDesc(Long usuarioId);
    List<Auditoria> findAllByOrderByFechaAuditoriaDesc();
}
