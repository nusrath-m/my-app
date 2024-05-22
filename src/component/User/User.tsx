import React from 'react';
import { user } from '../../models/user.model';
import styles from './User.module.css'
import Button from '../Button/Button';
import Modal from '../PopupModal/Modal';

interface UserProps {
  items: user[];
  openModal: (u: user) => void;
  closeModal: () => void;
  user: user;
  isModalOpen: boolean
//   onDeleteTodo: (id: string) => void;
}

const User: React.FC<UserProps> = props => {
  return (
    <div className={styles.container}>
      {props.items.map(user => (
        <div className={styles.card} key={user.id}>
          <div className={styles.avatar}>
            <div className={styles.imageContainer}>
            <img src={user.avatar} alt="avatar" />
            </div>
          </div>
          <div  className={styles.contentConatiner}>
            <h3>{user.firstname} {user.lastname}</h3>
            <p className={styles.description}>{user.description}</p>
            <Button onClickHandler={props.openModal} user={user} text='View More' />
          </div>
        </div>
      ))}
      <Modal show={props.isModalOpen} onClose={props.closeModal} user={props.user} />
    </div>
  );
};

export default User;
