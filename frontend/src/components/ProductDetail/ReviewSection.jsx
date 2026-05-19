import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../apiConfig';
import { useAuth } from '../../context/AuthContext';
import styles from './ReviewSection.module.css';

const ReviewSection = ({ productId }) => {
  const { profile, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');

  const isAdmin = profile?.role === 'ADMIN';

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  // READ - Fetch all reviews for this product
  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/product/${productId}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  // CREATE - Post a new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please login to post a review.");
      return;
    }

    const newReview = {
      productId,
      rating,
      comment: `${profile.fullName}: ${comment}` // Prefix with user name for now
    };

    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });

      if (response.ok) {
        setComment('');
        setRating(5);
        fetchReviews();
      }
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  // UPDATE - Edit an existing review
  const startEdit = (review) => {
    setEditingId(review.id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditRating(5);
    setEditComment('');
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: editRating, comment: editComment })
      });

      if (response.ok) {
        setEditingId(null);
        fetchReviews();
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  // DELETE - Remove a review
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className={styles.reviewSection}>
      <h3 className={styles.title}>Customer Reviews ({reviews.length})</h3>

      <div className={styles.reviewList}>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              {editingId === review.id ? (
                /* EDIT MODE */
                <div className={styles.editMode}>
                  <div className={styles.starInput}>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <span
                        key={num}
                        className={num <= editRating ? styles.starActive : styles.starInactive}
                        onClick={() => setEditRating(num)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className={styles.editTextarea}
                  />
                  <div className={styles.editActions}>
                    <button onClick={() => handleUpdate(review.id)} className={styles.saveBtn}>Save</button>
                    <button onClick={cancelEdit} className={styles.cancelBtn}>Cancel</button>
                  </div>
                </div>
              ) : (
                /* VIEW MODE */
                <>
                  <div className={styles.reviewHeader}>
                    <div className={styles.stars}>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                    <span className={styles.date}>{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Just now'}</span>
                  </div>
                  <p className={styles.comment}>{review.comment}</p>
                  
                  {isAdmin && (
                    <div className={styles.reviewActions}>
                      <button onClick={() => startEdit(review)} className={styles.editBtn}>✏️ Edit</button>
                      <button onClick={() => handleDelete(review.id)} className={styles.deleteBtn}>🗑️ Delete</button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p className={styles.noReviews}>No reviews yet. Be the first to review!</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <h4>Leave a Review</h4>
        {!isAuthenticated && <p style={{ color: '#fa782d', fontSize: '12px' }}>Please login to leave a review.</p>}
        <div className={styles.formGroup}>
          <label>Rating</label>
          <div className={styles.starInput}>
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={num <= rating ? styles.starActive : styles.starInactive}
                onClick={() => setRating(num)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
            required
            disabled={!isAuthenticated}
          />
        </div>
        <button type="submit" className={styles.submitBtn} disabled={!isAuthenticated}>Post Review</button>
      </form>
    </div>
  );
};

export default ReviewSection;
