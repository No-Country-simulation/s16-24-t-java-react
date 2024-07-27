package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.MembershipDTO;
import com.project.managementapi.entities.Customer;
import com.project.managementapi.entities.membership.EMembershipType;
import com.project.managementapi.entities.membership.Membership;
import com.project.managementapi.exceptions.ResourceNotFoundException;
import com.project.managementapi.repositories.CustomerRepository;
import com.project.managementapi.repositories.MembershipRepository;
import com.project.managementapi.services.IMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MembershipServiceImpl implements IMembershipService {

    @Autowired
    private MembershipRepository membershipRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public void createMembership(Customer customer, MembershipDTO membershipDto) {
        membershipRepository.save(Membership.builder()
                .membershipType(EMembershipType.valueOf(membershipDto.getMembershipType()))
                .customer(customer)
                .build());
    }

    @Override
    public void updateMembership(String dni, MembershipDTO membershipDTO) {
        Optional<Customer> customerOptional = customerRepository.findByPersonalInfoDni(dni);
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            createMembership(customer, membershipDTO);
        } else {
            throw new ResourceNotFoundException("Customer with DNI:" + dni + "not found");
        }
    }


}
