package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.MembershipDTO;
import com.project.managementapi.entities.Customer;
import com.project.managementapi.entities.membership.EMembershipType;
import com.project.managementapi.entities.membership.Membership;
import com.project.managementapi.repositories.MembershipRepository;
import com.project.managementapi.services.IMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MembershipServiceImpl implements IMembershipService {

    @Autowired
    private MembershipRepository membershipRepository;

    @Override
    public void createMembership(Customer customer, MembershipDTO membershipDto) {
        membershipRepository.save(Membership.builder()
                .membershipType(EMembershipType.valueOf(membershipDto.getMembershipType()))
                .customer(customer)
                .build());
    }
}
