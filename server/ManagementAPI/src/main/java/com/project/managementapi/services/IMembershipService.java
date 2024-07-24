package com.project.managementapi.services;

import com.project.managementapi.dtos.MembershipDTO;
import com.project.managementapi.entities.Customer;

public interface IMembershipService {

    void createMembership(Customer customer, MembershipDTO membershipDto);

    void updateMembership(Customer customer, MembershipDTO membershipDTO);
}
