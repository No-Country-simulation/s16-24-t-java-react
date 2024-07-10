package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.AddressDTO;
import com.project.managementapi.entities.Address;
import com.project.managementapi.repositories.AddressRepository;
import com.project.managementapi.services.IAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService implements IAddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public Address createAddress(AddressDTO dto) {
        return addressRepository.save(Address.builder()
                .country(dto.getCountry())
                .state(dto.getState())
                .city(dto.getCity())
                .postalCode(dto.getPostalCode())
                .street(dto.getStreet())
                .streetNumber(dto.getStreetNumber())
                .build());
    }

}
