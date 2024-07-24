package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.AddressDTO;
import com.project.managementapi.entities.Address;
import com.project.managementapi.exceptions.ResourceNotFoundException;
import com.project.managementapi.repositories.AddressRepository;
import com.project.managementapi.services.IAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressService implements IAddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public Address createAddress(AddressDTO dto) {
        return addressRepository.save(Address.builder()
                .city(dto.getCity())
                .postalCode(dto.getPostalCode())
                .street(dto.getStreet())
                .build());
    }


    @Override
    public void updateAddress(AddressDTO dto, Long addressId){
        Optional<Address> opt = this.addressRepository.findById(addressId);
        if(opt.isEmpty()) throw new ResourceNotFoundException("Doesn't exists address.");

        Address address = opt.get();
        address.setStreet(dto.getStreet());
        address.setCity(dto.getCity());
        address.setPostalCode(dto.getPostalCode());

        addressRepository.save(address);
    }
}
