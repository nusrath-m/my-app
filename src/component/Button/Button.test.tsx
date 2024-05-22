import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

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

describe('Button Component', () => {
  it('renders button with correct text', () => {
    render(<Button text="View More" onClickHandler={() => {}} user={mockUser} />);
    
    const button = screen.getByText(/View More/i);
    expect(button).toBeInTheDocument();
  });

  it('calls onClickHandler function with user when clicked', () => {
    const onClickHandlerMock = jest.fn();
    render(<Button text="View More" onClickHandler={onClickHandlerMock} user={mockUser} />);
    
    const button = screen.getByText(/View More/i);
    fireEvent.click(button);

    expect(onClickHandlerMock).toHaveBeenCalledTimes(1);
    expect(onClickHandlerMock).toHaveBeenCalledWith(mockUser);
  });
});
