package com.pawmarket.controllers;

import com.pawmarket.models.Address;
import com.pawmarket.repositories.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/addresses")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    @GetMapping("/user/{userId}")
    public List<Address> getAddressesByUserId(@PathVariable UUID userId) {
        return addressRepository.findByUserIdOrderByIsDefaultDesc(userId);
    }

    @PostMapping
    public Address createAddress(@RequestBody Address address) {
        // If it's set as default, we might need logic to unset others, 
        // but for now we'll just save it.
        return addressRepository.save(address);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long id, @RequestBody Address addressDetails) {
        return addressRepository.findById(id).map(address -> {
            address.setFullName(addressDetails.getFullName());
            address.setPhone(addressDetails.getPhone());
            address.setAddressLine1(addressDetails.getAddressLine1());
            address.setAddressLine2(addressDetails.getAddressLine2());
            address.setCity(addressDetails.getCity());
            address.setStateProvince(addressDetails.getStateProvince());
            address.setPostalCode(addressDetails.postalCode());
            address.setCountry(addressDetails.getCountry());
            address.setIsDefault(addressDetails.getIsDefault());
            address.setLabel(addressDetails.getLabel());
            return ResponseEntity.ok(addressRepository.save(address));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
        if (addressRepository.existsById(id)) {
            addressRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
