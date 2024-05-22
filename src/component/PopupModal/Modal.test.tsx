import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

const mockUser = {
  id: '1',
  firstname: 'John',
  lastname: 'Doe',
  avatar: 'john-doe-avatar.jpg',
  username: 'johndoe',
  email: 'john@example.com',
  role: 'user',
  join_date: '2022-05-01',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

describe('Modal Component', () => {
  it('renders modal with correct user details when show is true', () => {
    render(<Modal show={true} onClose={() => {}} user={mockUser} />);

    const firstNameLabel = screen.getByText(/First Name:/i);
    expect(firstNameLabel).toBeInTheDocument();

    // Use queryAllByText to find all occurrences of "John"
    const firstNameValues = screen.queryAllByText(/John/i);
    expect(firstNameValues.length).toBeGreaterThan(0);
    // can make additional assertions based on the number of occurrences

    // Add similar expectations for other user details
  });

  it('does not render modal when show is false', () => {
    render(<Modal show={false} onClose={() => {}} user={mockUser} />);

    const modalHeader = screen.queryByText(/User Details/i);
    expect(modalHeader).not.toBeInTheDocument();
  });

  it('calls onClose function when modal backdrop is clicked', () => {
    const onCloseMock = jest.fn();
    render(<Modal show={true} onClose={onCloseMock} user={mockUser} />);

    const modalBackdrop = screen.getByTestId('modal-backdrop');
    fireEvent.click(modalBackdrop);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose function when close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<Modal show={true} onClose={onCloseMock} user={mockUser} />);

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
