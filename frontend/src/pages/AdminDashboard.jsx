import React, { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [activeTab, setActiveTab] = useState('users');

    // Edit states for users
    const [editingUserId, setEditingUserId] = useState(null);
    const [editUserName, setEditUserName] = useState('');
    const [editUserEmail, setEditUserEmail] = useState('');

    // Edit states for reviews
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editReviewRating, setEditReviewRating] = useState(5);
    const [editReviewComment, setEditReviewComment] = useState('');

    // Create new user states
    const [showAddUser, setShowAddUser] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchReviews();
    }, []);

    // ==================== USERS CRUD ====================

    // READ - Fetch all users
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoadingUsers(false);
        }
    };

    // CREATE - Add new user
    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName: newUserName, email: newUserEmail, password: newUserPassword })
            });
            if (response.ok) {
                setNewUserName(''); setNewUserEmail(''); setNewUserPassword('');
                setShowAddUser(false);
                fetchUsers();
            } else {
                const error = await response.text();
                alert(error);
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // UPDATE - Edit user
    const startEditUser = (user) => {
        setEditingUserId(user.id);
        setEditUserName(user.fullName || '');
        setEditUserEmail(user.email);
    };

    const handleUpdateUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/auth/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName: editUserName, email: editUserEmail })
            });
            if (response.ok) {
                setEditingUserId(null);
                fetchUsers();
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // DELETE - Remove user
    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            const response = await fetch(`http://localhost:8080/api/auth/users/${id}`, { method: 'DELETE' });
            if (response.ok) fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // ==================== REVIEWS CRUD ====================

    // READ - Fetch all reviews (we'll get product 1 for now, or all)
    const fetchReviews = async () => {
        try {
            // Fetch reviews for multiple product IDs
            const allReviews = [];
            for (let i = 1; i <= 20; i++) {
                try {
                    const response = await fetch(`http://localhost:8080/api/reviews/product/${i}`);
                    if (response.ok) {
                        const data = await response.json();
                        allReviews.push(...data);
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
            const response = await fetch(`http://localhost:8080/api/reviews/${id}`, {
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
            const response = await fetch(`http://localhost:8080/api/reviews/${id}`, { method: 'DELETE' });
            if (response.ok) fetchReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div className={styles.adminPage}>
            <div className={styles.header}>
                <h1>🛡️ Admin Dashboard</h1>
                <p>Manage your registered users, reviews, and platform data.</p>
            </div>

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
                    👤 Users
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
                        <h2>User Management</h2>
                        <button className={styles.addBtn} onClick={() => setShowAddUser(!showAddUser)}>
                            {showAddUser ? '✕ Cancel' : '+ Add User'}
                        </button>
                    </div>

                    {/* CREATE FORM */}
                    {showAddUser && (
                        <form onSubmit={handleAddUser} className={styles.addForm}>
                            <input 
                                type="text" placeholder="Full Name" value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)} required
                            />
                            <input 
                                type="email" placeholder="Email" value={newUserEmail}
                                onChange={(e) => setNewUserEmail(e.target.value)} required
                            />
                            <input 
                                type="password" placeholder="Password" value={newUserPassword}
                                onChange={(e) => setNewUserPassword(e.target.value)} required
                            />
                            <button type="submit" className={styles.saveBtn}>Create User</button>
                        </form>
                    )}

                    <table className={styles.userTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingUsers ? (
                                <tr><td colSpan="6" className={styles.centerText}>Loading...</td></tr>
                            ) : users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>
                                            {editingUserId === user.id ? (
                                                <input value={editUserName} onChange={(e) => setEditUserName(e.target.value)} className={styles.editInput} />
                                            ) : (
                                                <span className={styles.nameCell}>{user.fullName}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingUserId === user.id ? (
                                                <input value={editUserEmail} onChange={(e) => setEditUserEmail(e.target.value)} className={styles.editInput} />
                                            ) : (
                                                user.email
                                            )}
                                        </td>
                                        <td><span className={styles.roleTag}>{user.role}</span></td>
                                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className={styles.actionCell}>
                                            {editingUserId === user.id ? (
                                                <>
                                                    <button className={styles.saveBtn} onClick={() => handleUpdateUser(user.id)}>💾 Save</button>
                                                    <button className={styles.cancelBtn} onClick={() => setEditingUserId(null)}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className={styles.editBtn} onClick={() => startEditUser(user)}>✏️ Edit</button>
                                                    <button className={styles.deleteBtn} onClick={() => handleDeleteUser(user.id)}>🗑️ Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6" className={styles.centerText}>No users found.</td></tr>
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
                                <th>Created At</th>
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
                                        <td>{new Date(review.createdAt).toLocaleDateString()}</td>
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
