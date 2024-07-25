package com.project.managementapi.repositories;

import com.project.managementapi.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByPersonalInfoDni(String dni);

    Optional<Customer> findById(Long id);
}
