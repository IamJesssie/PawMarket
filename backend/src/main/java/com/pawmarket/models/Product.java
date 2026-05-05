package com.pawmarket.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "products", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = "old_price")
    private BigDecimal oldPrice;

    private String discount;

    @Column(name = "image_url")
    private String imageUrl;

    private BigDecimal rating;

    @Column(name = "reviews_count")
    private Integer reviewsCount;

    @Column(unique = true)
    private String sku;

    @Column(name = "stock_status")
    private String stockStatus;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "long_description", columnDefinition = "TEXT")
    private String longDescription;

    private String brand;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;
}
