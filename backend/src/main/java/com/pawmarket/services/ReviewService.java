package com.pawmarket.services;

import com.pawmarket.models.Review;
import com.pawmarket.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    // READ - Get all reviews for a product
    public List<Review> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    // CREATE - Save a new review
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    // UPDATE - Update an existing review
    public Review updateReview(Long id, Review updatedReview) {
        Optional<Review> existing = reviewRepository.findById(id);
        if (existing.isPresent()) {
            Review review = existing.get();
            review.setRating(updatedReview.getRating());
            review.setComment(updatedReview.getComment());
            return reviewRepository.save(review);
        }
        return null;
    }

    // DELETE - Delete a review by ID
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}
