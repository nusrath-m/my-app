import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import User from './User';

const mockUsers = [
  {
    id: '1',
    firstname: 'John',
    lastname: 'Doe',
    avatar: 'john-doe-avatar.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    email:'JhoneDoe@gmail.com',
    join_date:'24-02-2024',
    role:'Developer',
    username: 'jhonD'
  },
  {
    id: '2',
    firstname: 'Jane',
    lastname: 'Smith',
    avatar: 'jane-smith-avatar.jpg',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    email:'HaneSmith@gmail.com',
    join_date:'25-06-2025',
    role:'Manager',
    username: 'jane.s'
  },
];

describe('User Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders user cards with correct data', () => {
      render(<User items={mockUsers} openModal={() => {}} closeModal={() => {}} user={mockUsers[0]} isModalOpen={false} />);


    const johnDoeCard = screen.getByText(/John Doe/i);
    expect(johnDoeCard).toBeInTheDocument();

    const janeSmithCard = screen.getByText(/Jane Smith/i);
    expect(janeSmithCard).toBeInTheDocument();
  });

  it('opens modal on button click', () => {
    const openModalMock = jest.fn();
    render(<User items={mockUsers} openModal={openModalMock} closeModal={() => {}} user={mockUsers[0]} isModalOpen={false} />);
  
    const viewMoreButtons = screen.getAllByText(/View More/i);
    expect(viewMoreButtons.length).toBeGreaterThan(0);
    
    viewMoreButtons.forEach(button => {
      fireEvent.click(button);
    });
    
    expect(openModalMock).toHaveBeenCalledTimes(viewMoreButtons.length);
  });
});