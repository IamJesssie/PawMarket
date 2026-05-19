package com.pawmarket.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Entity
@Table(name = "profiles")
@Data
public class User {
    @Id
    private UUID id;

    @Column(name = "email", nullable = true)
    private String email;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "member_since")
    private Integer memberSince;

    @Column(name = "loyalty_points")
    private Integer loyaltyPoints;

    @Column(name = "role")
    private String role = "USER";
}
