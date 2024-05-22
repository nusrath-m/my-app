import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { user } from './models/user.model';
import User from './component/User/User';
import LoadingSpinner from './component/Spinner/Spinner';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Button from '@mui/material/Button';

const initialUserObj: user = {
  avatar: '',
  description: '',
  email: '',
  firstname: '',
  id: '',
  join_date: '',
  lastname: '',
  role: '',
  username: ''
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App: React.FC = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [selectedUser, setSelectedUser] = useState<user>(initialUserObj);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get('https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users');
      setUsers(data.data.users);
    } catch (error) {
      setError('Error fetching users');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user: user): void => {
    setIsModalOpen(true);
    setSelectedUser(user);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedUser(initialUserObj);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const renderErrorComponent = () => (
    <div className="error">
      <p>Something went wrong while fetching the data.</p>
      <Button variant="contained" color="primary" onClick={fetchUsers}>
        Retry
      </Button>
    </div>
  );

  return (
    <div className="App">
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && renderErrorComponent()}
      {!isLoading && !error && (
        <User
          items={users}
          openModal={openModal}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          user={selectedUser}
        />
      )}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
