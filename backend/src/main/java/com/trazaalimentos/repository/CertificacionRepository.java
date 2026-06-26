package com.trazaalimentos.repository;

import com.trazaalimentos.model.Certificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CertificacionRepository extends JpaRepository<Certificacion, Long> {
    Optional<Certificacion> findByCodigo(String codigo);
    java.util.List<Certificacion> findByActivaTrue();
}
