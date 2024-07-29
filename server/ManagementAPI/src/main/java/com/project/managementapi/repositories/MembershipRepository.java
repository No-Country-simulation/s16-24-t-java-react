package com.project.managementapi.repositories;

import com.project.managementapi.entities.Customer;
import com.project.managementapi.entities.membership.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {
    Membership findByCustomer(Customer customer);

//    @Query("SELECT m FROM Membership m WHERE m.customer.id = :customerId ORDER BY m.endDate DESC")
//    Membership findFirstByCustomerIdOrderByEndDateDesc(@Param("customerId") Long customerId);

    @Query(value = "SELECT * FROM memberships m WHERE m.customer_id = :customerId ORDER BY m.end_date DESC LIMIT 1", nativeQuery = true)
    Membership findFirstByCustomerOrderByEndDateDesc(@Param("customerId") Long customerId);

}
