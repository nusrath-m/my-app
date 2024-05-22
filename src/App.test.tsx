// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

// Mock axios.get to return a mock response
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockResponse = {
  data: {
    data: {
      users: [
        // Add sample user data here as per your model
        { id: '1', firstname: 'John', lastname: 'Doe', username: 'johndoe' },
        { id: '2', firstname: 'Jane', lastname: 'Smith', username: 'janesmith' },
      ]
    }
  }
};
mockedAxios.get.mockResolvedValue(mockResponse);

describe('App Component', () => {
  it('renders loading spinner initially', async () => {
    render(<App />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    // Ensure the loading spinner disappears after data is loaded
    await waitFor(() => expect(screen.queryByTestId('loading-spinner')).toBeNull());
  });

  it('renders user data and modal', async () => {
    render(<App />);
    // Ensure user data is rendered
    const johnDoeElement = await screen.findByText(/John Doe/i);
    expect(johnDoeElement).toBeInTheDocument();

    // Open modal
    fireEvent.click(johnDoeElement);
    const modal = screen.getByTestId('user-modal');
    expect(modal).toBeInTheDocument();

    // Close modal
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(modal).not.toBeInTheDocument();
  });
});
