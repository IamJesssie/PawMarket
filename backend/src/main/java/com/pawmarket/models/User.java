package com.pawmarket.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Entity
@Table(name = "profiles", schema = "public")
@Data
public class User {
    @Id
    private UUID id;

    private String email;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "member_since")
    private Integer memberSince;

    @Column(name = "loyalty_points")
    private Integer loyaltyPoints;

    private String role = "USER";
}
