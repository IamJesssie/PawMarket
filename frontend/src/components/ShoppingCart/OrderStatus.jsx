import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import NotificationModal from '../common/NotificationModal';
import styles from '../../pages/AccountOverview.module.css';

const OrderStatus = ({ orderId, onClose }) => {
  const { getOrderById, updateOrderStatus } = useOrder();
  const navigate = useNavigate();
  const [isMarking, setIsMarking] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <p>Order not found</p>
        </div>
      </div>
    );
  }

  const handleMarkAsReceived = () => {
    setIsMarking(true);
    setTimeout(() => {
      const newStatus = order.type === 'grooming' ? 'Service Completed' : 'Order Received';
      updateOrderStatus(orderId, newStatus);
      setIsMarking(false);
      setShowSuccessModal(true);
    }, 800);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    if (onClose) {
      onClose();
    } else {
      navigate('/dashboard');
    }
  };

  const statusColor = 
    order.status === 'To be shipped' ? '#fa782d' :
    order.status === 'Appointment Created' ? '#fa782d' :
    order.status === 'Order Received' ? '#006a63' :
    order.status === 'Service Completed' ? '#006a63' :
    '#006a63';

  // Safely parse date
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString();

  return (
    <div className={styles.orderStatusOverlay}>
      <div className={styles.orderStatusModal}>
        <div className={styles.orderStatusHeader}>
          <h2>Order Status</h2>
          <button 
            className={styles.closeBtn}
            onClick={() => onClose && onClose()}
          >
            ×
          </button>
        </div>

        <div className={styles.orderStatusContent}>
          <div className={styles.orderIdSection}>
            <p className={styles.label}>{order.type === 'grooming' ? 'Appointment ID' : 'Order ID'}</p>
            <p className={styles.orderId}>{orderId}</p>
          </div>

          <div className={styles.statusBadgeSection}>
            <p className={styles.label}>Current Status</p>
            <span 
              className={styles.statusBadge}
              style={{ backgroundColor: statusColor }}
            >
              {order.status}
            </span>
          </div>

          <div className={styles.orderDetailsSection}>
            <p className={styles.label}>Details</p>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Amount</span>
                <span className={styles.detailValue}>
                  ₱{order.total?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Date</span>
                <span className={styles.detailValue}>
                  {orderDate}
                </span>
              </div>
            </div>
          </div>

          {(order.status === 'To be shipped' || order.status === 'Appointment Created') && (
            <div className={styles.actionSection}>
              <button 
                className={styles.primaryButton}
                onClick={handleMarkAsReceived}
                disabled={isMarking}
              >
                {isMarking ? 'Marking...' : order.type === 'grooming' ? 'Mark as Done (Service)' : 'Mark as Order Received'}
              </button>
              <p className={styles.rewardHint}>
                ⭐ You'll earn 2 loyalty points when you {order.type === 'grooming' ? 'complete the service' : 'confirm receipt'}!
              </p>
            </div>
          )}

          {(order.status === 'Order Received' || order.status === 'Service Completed') && (
            <div className={styles.successSection}>
              <p className={styles.successMessage}>
                ✓ Thank you for {order.type === 'grooming' ? 'completing the service' : 'confirming receipt'}!
              </p>
              <p className={styles.rewardMessage}>You earned 2 loyalty points!</p>
            </div>
          )}
        </div>
      </div>

      <NotificationModal 
        isOpen={showSuccessModal} 
        message={`🎉 Success! You earned 2 loyalty points!`}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default OrderStatus;
