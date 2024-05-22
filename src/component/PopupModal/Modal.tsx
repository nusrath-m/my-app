import React from 'react';
import styles from './Modal.module.css';
import { user } from '../../models/user.model';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  user: user;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, user }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose} data-testid="modal-backdrop">
    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modalHeader}>
        <h2>User Details</h2>
        <button className={styles.closeButton} onClick={onClose} data-testid="close-button">&times;</button>
      </div>
      <div className={styles.modalBody}>
        <div className={styles.userDetails}>
          <img src={user.avatar} alt="Avatar" className={styles.userAvatar} />
          <div className={styles.userField}>
            <label>First Name:</label>
            <span>{user.firstname}</span>
          </div>
          <div className={styles.userField}>
            <label>Last Name:</label>
            <span>{user.lastname}</span>
          </div>
          <div className={styles.userField}>
            <label>Username:</label>
            <span>{user.username}</span>
          </div>
          <div className={styles.userField}>
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div className={styles.userField}>
            <label>Role:</label>
            <span>{user.role}</span>
          </div>
          <div className={styles.userField}>
            <label>Join Date:</label>
            <span>{user.join_date}</span>
          </div>
          <div className={styles.userField}>
            <label>Description:</label>
            <span className={styles.mobileDescription}>{user.description}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Modal;
