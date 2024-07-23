package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.MembershipDTO;
import com.project.managementapi.entities.Customer;
import com.project.managementapi.entities.membership.EMembershipType;
import com.project.managementapi.entities.membership.Membership;
import com.project.managementapi.repositories.MembershipRepository;
import com.project.managementapi.services.IMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    @Override
    public void updateMembership(Customer customer, MembershipDTO membershipDTO) {
        Membership membershipToUpdate = membershipRepository.findByCustomer(customer);
        membershipToUpdate.setMembershipType(EMembershipType.valueOf(membershipDTO.getMembershipType()));
        membershipRepository.save(membershipToUpdate);
    }
}
