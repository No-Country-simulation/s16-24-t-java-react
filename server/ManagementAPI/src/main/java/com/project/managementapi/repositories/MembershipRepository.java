package com.project.managementapi.repositories;

import com.project.managementapi.entities.Customer;
import com.project.managementapi.entities.membership.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {
    Membership findByCustomer(Customer customer);
}
