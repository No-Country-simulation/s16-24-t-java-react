package com.project.managementapi.repositories;

import com.project.managementapi.entities.Complex;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplexRepository extends JpaRepository<Complex, Long>, JpaSpecificationExecutor<Complex> {
    boolean existsByCuit(String cuit);

}
