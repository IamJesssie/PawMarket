package com.pawmarket.services;

import com.pawmarket.models.GroomingAddon;
import com.pawmarket.models.GroomingService;
import com.pawmarket.repositories.GroomingAddonRepository;
import com.pawmarket.repositories.GroomingServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GroomingServiceLogic {

    @Autowired
    private GroomingServiceRepository serviceRepository;

    @Autowired
    private GroomingAddonRepository addonRepository;

    public List<GroomingService> getAllServices() {
        return serviceRepository.findAll();
    }

    public List<GroomingAddon> getAllAddons() {
        return addonRepository.findAll();
    }

    public GroomingService getServiceById(Long id) {
        return serviceRepository.findById(id).orElse(null);
    }
}
