package com.trazaalimentos.repository;

import com.trazaalimentos.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Optional<Producto> findByCodigoQr(String codigoQr);
    List<Producto> findByProductorId(Long productorId);
    Optional<Producto> findByLoteId(String loteId);
}
