import React from 'react';
import styles from './Spinner.module.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.spinnerOverlay}>
      <div className={styles.spinner} />
    </div>
  );
};

export default LoadingSpinner;
