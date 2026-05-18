import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './AddressManagement.module.css';

const avatarUrl = 'https://www.figma.com/api/mcp/asset/4f7cd715-1f04-4a73-89f7-5c766ee5c8d0';

const sidebarItems = [
  'Overview',
  'Order History',
  'Appointments',
  'Wishlist & Saved',
  'Recently Viewed',
  'Profile',
  'Addresses',
  'Password & Security',
  'Notifications',
  'Payment Methods',
  'My Pets',
  'Logout',
];

const navRoutes = {
  Overview: '/dashboard',
  Addresses: '/dashboard/addresses',
  Profile: '/dashboard/profile',
};

const ProfileEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initial user data - in a real app, this would come from an API or context
  const [formData, setFormData] = useState({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+63 912 345 6789',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset form to original values
    setFormData({
      fullName: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '+63 912 345 6789',
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Make API call to update profile
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // For now, just simulate saving
      setTimeout(() => {
        setIsEditing(false);
        setIsSaving(false);
        alert('Profile updated successfully!');
      }, 500);
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.accountShell}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarProfile}>
            <img className={styles.avatar} src={avatarUrl} alt={formData.fullName} />
            <div className={styles.profileName}>{formData.fullName}</div>
            <div className={styles.profileSubtitle}>Pet owner since 2024</div>
          </div>

          <nav className={styles.sidebarNav}>
            {sidebarItems.map((item) => {
              const isActive = navRoutes[item] ? location.pathname === navRoutes[item] : false;
              return (
                <button
                  key={item}
                  type="button"
                  className={`${styles.sidebarNavItem} ${isActive ? styles.activeNavItem : ''}`}
                  onClick={() => navRoutes[item] && navigate(navRoutes[item])}
                >
                  {item}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className={styles.contentArea}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Edit Profile</h1>
          </div>

          <div className={styles.sectionStack}>
            <div className={styles.formCard}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName" className={styles.formLabel}>Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={styles.formInput}
                  placeholder="Enter your full name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={styles.formInput}
                  placeholder="Enter your email"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.formLabel}>Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={styles.formInput}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className={styles.buttonGroup}>
                {!isEditing ? (
                  <button 
                    className={styles.primaryButton}
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button 
                      className={styles.primaryButton}
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button 
                      className={styles.outlineButton}
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileEdit;
