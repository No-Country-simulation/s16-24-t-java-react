package com.project.managementapi.repositories;

import com.project.managementapi.entities.Complex;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplexRepository extends JpaRepository<Complex, Long> {
    boolean existsByCuit(String cuit);
}
