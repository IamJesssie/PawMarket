package com.pawmarket.repositories;

import com.pawmarket.models.GroomingAddon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroomingAddonRepository extends JpaRepository<GroomingAddon, Long> {
}
