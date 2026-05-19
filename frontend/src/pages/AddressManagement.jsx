import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './AddressManagement.module.css';
import AccountSidebar from '../components/Overview/AccountSidebar';

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

const sidebarIcons = {
  'Overview': '/images/account/overview.svg',
  'Order History': '/images/account/orders.svg',
  'Appointments': '/images/account/appointments.svg',
  'Wishlist & Saved': '/images/account/wishlist.svg',
  'Recently Viewed': '/images/account/recent.svg',
  'Profile': '/images/account/profile.svg',
  'Addresses': '/images/account/addresses.svg',
  'Password & Security': '/images/account/security.svg',
  'Notifications': '/images/account/notifications.svg',
  'Payment Methods': '/images/account/payments.svg',
  'My Pets': '/images/account/pets.svg',
  'Logout': '/images/account/logout.svg',
};

const sidebarRoutes = {
  'Overview': '/dashboard',
  'Order History': '/dashboard/orders',
  'Appointments': '/dashboard/appointments',
  'Wishlist & Saved': '/wishlist',
  'Recently Viewed': '/recently-viewed',
  'Addresses': '/dashboard/addresses',
  'Profile': '/dashboard/profile',
  'Password & Security': '/dashboard/security',
  'Notifications': '/dashboard/notifications',
  'Payment Methods': '/dashboard/payments',
  'My Pets': '/dashboard/pets',
};

const AddressManagement = () => {
  const { user, profile, isAuthenticated, loading: authLoading } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    country: 'Philippines',
    isDefault: false,
    label: ''
  });

  const fetchAddresses = async () => {
    if (isAuthenticated && user?.id) {
      try {
        const response = await fetch(`http://localhost:8080/api/addresses/user/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setAddresses(data);
        }
      } catch (err) {
        console.error("Failed to load addresses", err);
      }
    }
    setLoadingAddresses(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, [user?.id, isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveAddress = async () => {
    if (!isAuthenticated || !user) return;

    try {
      const response = await fetch('http://localhost:8080/api/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userId: user.id
        })
      });

      if (response.ok) {
        setFormData({
          fullName: '',
          phone: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          stateProvince: '',
          postalCode: '',
          country: 'Philippines',
          isDefault: false,
          label: ''
        });
        fetchAddresses();
      } else {
        alert("Failed to save address.");
      }
    } catch (err) {
      console.error("Network error saving address", err);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/addresses/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchAddresses();
      }
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  if (authLoading || loadingAddresses) return <div className={styles.pageContainer}>Loading profile...</div>;
  if (!profile) return <div className={styles.pageContainer}>Please log in to view your profile.</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.accountShell}>
        <AccountSidebar 
          user={profile} 
          sidebarItems={sidebarItems} 
          sidebarIcons={sidebarIcons}
          sidebarRoutes={sidebarRoutes} 
        />

        <main className={styles.contentArea}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Address Management</h1>
          </div>

          <div className={styles.sectionStack}>
            {addresses.length === 0 ? (
              <p>No addresses saved yet.</p>
            ) : (
              addresses.map(address => (
                <div key={address.id} className={`${address.isDefault ? styles.addressCard : styles.addressCardSecondary} ${address.isDefault ? styles.primaryCard : ''}`}>
                  <div className={address.isDefault ? styles.cardBody : styles.cardHeaderRow}>
                    <div>
                      <div className={styles.cardLabel}>{address.label || (address.isDefault ? 'DEFAULT' : 'ADDRESS')}</div>
                      <div className={styles.cardTitle}>{address.fullName}</div>
                      <div className={styles.cardText}>
                        {address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ''}, {address.city}, {address.stateProvince}, {address.postalCode}, {address.country}
                      </div>
                      <div className={styles.cardText}>{address.phone}</div>
                    </div>
                    <div className={styles.cardActions}>
                      <button className={address.isDefault ? styles.deleteButton : styles.deleteAction} onClick={() => handleDeleteAddress(address.id)}>Delete</button>
                    </div>
                  </div>
                  {address.isDefault && <span className={styles.defaultBadge}>DEFAULT</span>}
                </div>
              ))
            )}
          </div>

          <section className={styles.formSection}>
            <div className={styles.formHeader}>
              <h2>Add New Address</h2>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Full Name</label>
                <input className={styles.inputField} name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Phone</label>
                <input className={styles.inputField} name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Address Line 1</label>
                <input className={styles.inputField} name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} placeholder="Street address" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Address Line 2 (Optional)</label>
                <input className={styles.inputField} name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} placeholder="Apt, Suite, etc." />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>City</label>
                <input className={styles.inputField} name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>State / Province</label>
                <input className={styles.inputField} name="stateProvince" value={formData.stateProvince} onChange={handleInputChange} placeholder="State" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>ZIP / Postal Code</label>
                <input className={styles.inputField} name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="ZIP" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Label</label>
                <input className={styles.inputField} name="label" value={formData.label} onChange={handleInputChange} placeholder="e.g. Home, Work" />
              </div>
            </div>
            <div className={styles.checkboxRow}>
              <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleInputChange} />
              <span className={styles.checkboxLabel} style={{ marginLeft: '10px' }}>Set as default address</span>
            </div>
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={() => setFormData({fullName: '', phone: '', addressLine1: '', addressLine2: '', city: '', stateProvince: '', postalCode: '', country: 'Philippines', isDefault: false, label: ''})}>Cancel</button>
              <button type="button" className={styles.saveButton} onClick={handleSaveAddress}>Save Address</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AddressManagement;
