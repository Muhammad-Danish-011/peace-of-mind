
import { render, screen, waitFor } from '@testing-library/react';
import BasicCard from './BasicCard';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';



jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
  }));

  
describe('BasicCard', () => {

    it("renders 'Book Now' button", async () => {
        const basicCard = {
            title: 'test',
          description: 'Test Description',
        };
    
        render(<BasicCard basicCard={basicCard} />);

        await waitFor(() => {
            const button = screen.getByText("Book Now");
            expect(button).toBeInTheDocument();
          });

    });
});
