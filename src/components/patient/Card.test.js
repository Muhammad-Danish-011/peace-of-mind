
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Card from './Card';


jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));


describe('Card', () => {

  it("renders 'Book Now' button", async () => {
    const card = {
      title: 'test',
      description: 'Test Description',
    };

    render(<Card card={Card} />);

    await waitFor(() => {
      const button = screen.getByText("Book Now");
      expect(button).toBeInTheDocument();

    });
  });
});





