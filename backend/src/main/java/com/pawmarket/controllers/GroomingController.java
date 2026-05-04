package com.pawmarket.controllers;

import com.pawmarket.models.GroomingAddon;
import com.pawmarket.models.GroomingService;
import com.pawmarket.services.GroomingServiceLogic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/grooming")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class GroomingController {

    @Autowired
    private GroomingServiceLogic groomingServiceLogic;

    @GetMapping("/services")
    public List<GroomingService> getAllServices() {
        return groomingServiceLogic.getAllServices();
    }

    @GetMapping("/addons")
    public List<GroomingAddon> getAllAddons() {
        return groomingServiceLogic.getAllAddons();
    }

    @GetMapping("/services/{id}")
    public GroomingService getServiceById(@PathVariable Long id) {
        return groomingServiceLogic.getServiceById(id);
    }
}
