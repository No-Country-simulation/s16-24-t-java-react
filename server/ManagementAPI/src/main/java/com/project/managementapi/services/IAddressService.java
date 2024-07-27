package com.project.managementapi.services;

import com.project.managementapi.dtos.AddressDTO;
import com.project.managementapi.entities.Address;
import org.springframework.stereotype.Service;

@Service
public interface IAddressService {
    Address createAddress(AddressDTO dto);

    void updateAddress(AddressDTO dto, Long addressId);
}
