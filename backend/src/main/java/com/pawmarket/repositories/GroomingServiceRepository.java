package com.pawmarket.repositories;

import com.pawmarket.models.GroomingService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroomingServiceRepository extends JpaRepository<GroomingService, Long> {
}
