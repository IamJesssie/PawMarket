import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../apiConfig';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [activeTab, setActiveTab] = useState('users');
    const [error, setError] = useState(null);

    // Edit states for profiles (users)
    const [editingUserId, setEditingUserId] = useState(null);
    const [editUserName, setEditUserName] = useState('');
    const [editUserRole, setEditUserRole] = useState('USER');
    const [editLoyaltyPoints, setEditLoyaltyPoints] = useState(0);

    // Edit states for reviews
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editReviewRating, setEditReviewRating] = useState(5);
    const [editReviewComment, setEditReviewComment] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchReviews();
    }, []);

    // ==================== USERS (PROFILES) CRUD ====================

    // READ - Fetch all profiles from backend (pointing to profiles table)
    const fetchUsers = async () => {
        try {
            setError(null);
            const response = await fetch(`${API_BASE_URL}/auth/users`);
            if (response.ok) {
                const data = await response.json();
                setUsers(Array.isArray(data) ? data : []);
            } else {
                const errText = await response.text();
                setError(`Server Error: ${errText || 'Failed to fetch users'}`);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setError(`Network Error: ${error.message}`);
        } finally {
            setLoadingUsers(false);
        }
    };

    // UPDATE - Edit profile
    const startEditUser = (user) => {
        setEditingUserId(user.id);
        setEditUserName(user.fullName || '');
        setEditUserRole(user.role || 'USER');
        setEditLoyaltyPoints(user.loyaltyPoints || 0);
    };

    const handleUpdateUser = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    fullName: editUserName, 
                    role: editUserRole,
                    loyaltyPoints: parseInt(editLoyaltyPoints, 10)
                })
            });
            if (response.ok) {
                setEditingUserId(null);
                fetchUsers();
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // DELETE - Remove profile
    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user profile?')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/auth/users/${id}`, { method: 'DELETE' });
            if (response.ok) fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // ==================== REVIEWS CRUD ====================

    // READ - Fetch all reviews
    const fetchReviews = async () => {
        try {
            const allReviews = [];
            // Optimization: Fetch first 10 products
            for (let i = 1; i <= 10; i++) {
                try {
                    const response = await fetch(`${API_BASE_URL}/reviews/product/${i}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (Array.isArray(data)) allReviews.push(...data);
                    }
                } catch (e) { /* skip */ }
            }
            setReviews(allReviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoadingReviews(false);
        }
    };

    // UPDATE - Edit review
    const startEditReview = (review) => {
        setEditingReviewId(review.id);
        setEditReviewRating(review.rating);
        setEditReviewComment(review.comment);
    };

    const handleUpdateReview = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating: editReviewRating, comment: editReviewComment })
            });
            if (response.ok) {
                setEditingReviewId(null);
                fetchReviews();
            }
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    // DELETE - Remove review
    const handleDeleteReview = async (id) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/reviews/${id}`, { method: 'DELETE' });
            if (response.ok) fetchReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div className={styles.adminPage}>
            <div className={styles.header}>
                <h1>🛡️ Admin Dashboard</h1>
                <p>Manage your user profiles, loyalty points, and platform reviews.</p>
            </div>

            {error && (
                <div style={{ backgroundColor: '#fff3e0', color: '#fa782d', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #fa782d' }}>
                    <strong>⚠️ Error:</strong> {error}
                    <p style={{ fontSize: '12px', marginTop: '8px' }}>Tip: Make sure you ran the email sync SQL script in Supabase!</p>
                </div>
            )}

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <h3>Total Users</h3>
                    <p className={styles.statNumber}>{users.length}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Total Reviews</h3>
                    <p className={styles.statNumber}>{reviews.length}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Avg Rating</h3>
                    <p className={styles.statNumber}>
                        {reviews.length > 0 
                            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
                            : '—'}
                    </p>
                </div>
            </div>

            {/* Tab Buttons */}
            <div className={styles.tabs}>
                <button 
                    className={`${styles.tab} ${activeTab === 'users' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    👤 Profiles
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'reviews' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    ⭐ Reviews
                </button>
            </div>

            {/* ==================== USERS TAB ==================== */}
            {activeTab === 'users' && (
                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <h2>User Profiles (Sync with Supabase)</h2>
                        <span style={{ fontSize: '12px', color: '#666' }}>Users are managed via Supabase Auth</span>
                    </div>

                    <table className={styles.userTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Points</th>
                                <th>Since</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingUsers ? (
                                <tr><td colSpan="6" className={styles.centerText}>Loading...</td></tr>
                            ) : users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            {editingUserId === user.id ? (
                                                <input value={editUserName} onChange={(e) => setEditUserName(e.target.value)} className={styles.editInput} />
                                            ) : (
                                                <span className={styles.nameCell}>{user.fullName}</span>
                                            )}
                                        </td>
                                        <td>{user.email || 'N/A'}</td>
                                        <td>
                                            {editingUserId === user.id ? (
                                                <select value={editUserRole} onChange={(e) => setEditUserRole(e.target.value)} className={styles.editInput}>
                                                    <option value="USER">USER</option>
                                                    <option value="ADMIN">ADMIN</option>
                                                </select>
                                            ) : (
                                                <span className={styles.roleTag}>{user.role}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingUserId === user.id ? (
                                                <input type="number" value={editLoyaltyPoints} onChange={(e) => setEditLoyaltyPoints(e.target.value)} className={styles.editInput} style={{ width: '60px' }} />
                                            ) : (
                                                user.loyaltyPoints || 0
                                            )}
                                        </td>
                                        <td>{(user.memberSince && user.memberSince !== 2024) ? user.memberSince : '2026'}</td>
                                        <td className={styles.actionCell}>
                                            {editingUserId === user.id ? (
                                                <>
                                                    <button className={styles.saveBtn} onClick={() => handleUpdateUser(user.id)}>💾 Save</button>
                                                    <button className={styles.cancelBtn} onClick={() => setEditingUserId(null)}>✕</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className={styles.editBtn} onClick={() => startEditUser(user)}>✏️</button>
                                                    <button className={styles.deleteBtn} onClick={() => handleDeleteUser(user.id)}>🗑️</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6" className={styles.centerText}>No profiles found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ==================== REVIEWS TAB ==================== */}
            {activeTab === 'reviews' && (
                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <h2>Review Management</h2>
                    </div>

                    <table className={styles.userTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product ID</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingReviews ? (
                                <tr><td colSpan="6" className={styles.centerText}>Loading...</td></tr>
                            ) : reviews.length > 0 ? (
                                reviews.map(review => (
                                    <tr key={review.id}>
                                        <td>{review.id}</td>
                                        <td>{review.productId}</td>
                                        <td>
                                            {editingReviewId === review.id ? (
                                                <div className={styles.starInput}>
                                                    {[1,2,3,4,5].map(n => (
                                                        <span key={n} onClick={() => setEditReviewRating(n)}
                                                            style={{cursor:'pointer', color: n <= editReviewRating ? '#ffc107' : '#ddd'}}>★</span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className={styles.stars}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingReviewId === review.id ? (
                                                <input value={editReviewComment} onChange={(e) => setEditReviewComment(e.target.value)} className={styles.editInput} />
                                            ) : (
                                                review.comment
                                            )}
                                        </td>
                                        <td className={styles.actionCell}>
                                            {editingReviewId === review.id ? (
                                                <>
                                                    <button className={styles.saveBtn} onClick={() => handleUpdateReview(review.id)}>💾 Save</button>
                                                    <button className={styles.cancelBtn} onClick={() => setEditingReviewId(null)}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className={styles.editBtn} onClick={() => startEditReview(review)}>✏️ Edit</button>
                                                    <button className={styles.deleteBtn} onClick={() => handleDeleteReview(review.id)}>🗑️ Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6" className={styles.centerText}>No reviews found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;