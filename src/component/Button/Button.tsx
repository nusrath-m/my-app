import React from 'react';
import styles from './Button.module.css'
import { user } from '../../models/user.model';

interface ButtonProps {
  text: string;
  onClickHandler: (u: user) => void;
  user: user;
//   onDeleteTodo: (id: string) => void;
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <div onClick={() => props.onClickHandler(props.user)} className={styles.button}>
      {props.text}
    </div>
  );
};

export default Button;
