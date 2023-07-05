import { render, screen, waitFor } from '@testing-library/react';
import { getUser } from '../api';
import React from 'react';
import CounselorCalender from './CounselorCalender';
import { Api } from './api';
import '@testing-library/jest-dom/extend-expect';
// Create a mock object based on the actual module
jest.mock('../api', () => jest.createMockFromModule('../api'));

// Override the getUser function with a custom implementation
 getUser.mockImplementation(() => ({
  firstName: 'John',
  lastName: 'Doe',
}));

 
describe('CounselorCalender', () => {
  test('renders the component with correct user data', async () => {
    render(<CounselorCalender />);

    await waitFor(() => {
      expect(screen.getByText(/Chat with John Doe/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Google Meet video conference info added after booking/i)
      ).toBeInTheDocument();
    });
  });

  test('displays the avatar image', async () => {
    render(<CounselorCalender />);

    await waitFor(() => {
      const avatarImage = screen.getByAltText('Remy Sharp');
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage.src).toContain(
        'https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
      );
    });
  });

  test('displays the appointment information', async () => {
    render(<CounselorCalender />);

    await waitFor(() => {
      const appointmentText = screen.getByText('30 mins appointment');
      expect(appointmentText).toBeInTheDocument();
    });
  });

  test('displays the calendar', async () => {
    render(<CounselorCalender />);

    await waitFor(() => {
      const calendarComponent = screen.getByTestId('calendar');
      expect(calendarComponent).toBeInTheDocument();
    });
  });
});
