package com.pawmarket.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "appointments", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private GroomingService service;

    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    @Column(name = "appointment_time", nullable = false)
    private String appointmentTime;

    @Column(name = "pet_name", nullable = false)
    private String petName;

    @Column(name = "pet_type", nullable = false)
    private String petType;

    private String breed;

    @Column(name = "pet_age")
    private String petAge;

    @Column(name = "special_instructions", columnDefinition = "TEXT")
    private String specialInstructions;

    private String status = "Confirmed";

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @ManyToMany
    @JoinTable(
        name = "appointment_addons",
        schema = "public",
        joinColumns = @JoinColumn(name = "appointment_id"),
        inverseJoinColumns = @JoinColumn(name = "addon_id")
    )
    private Set<GroomingAddon> addons = new HashSet<>();
}
