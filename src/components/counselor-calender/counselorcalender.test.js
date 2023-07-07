// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import Counslor from './counselorcalender';

// describe('Counslor component', () => {
//   test('renders today\'s appointments', () => {
//     render(<Counslor />);
//     const todayAppointmentsElement = screen.getByText(/30 mins appointment/i);
//     expect(todayAppointmentsElement).toBeTruthy();
//   });
// })
import React from 'react';
import { render, screen } from '@testing-library/react';
import CounselorCalendar from './counselorcalender';

describe('CounselorCalendar component', () => {
  test('renders the counselor name', () => {
    render(<CounselorCalendar />);
    const counselorNameElement = screen.getByTestId("name");
    expect(counselorNameElement).toBeTruthy();
  });

  test('renders the chat details', () => {
    render(<CounselorCalendar />);
    const chatElement = screen.getByTestId("chat");
    expect(chatElement).toBeTruthy();

    const appointmentElement = screen.getByTestId("30");
    expect(appointmentElement).toBeTruthy();

    const videoConferenceElement = screen.getByTestId("google-meet");
    expect(videoConferenceElement).toBeTruthy();
  });

});
