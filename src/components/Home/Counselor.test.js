import React from 'react';
import { render, screen } from '@testing-library/react';
import Counslor from './Counslor';

describe('Counslor component', () => {
  test('renders today\'s appointments', () => {
    render(<Counslor />);
    const todayAppointmentsElement = screen.getByText(/Today's Appointments/i);
    expect(todayAppointmentsElement).toBeTruthy();
  });

  test('renders weekly appointments graph', () => {
    render(<Counslor />);
    const weeklyAppointmentsElement = screen.getByAltText('graph');
    expect(weeklyAppointmentsElement).toBeTruthy();
  });

  test('renders total number of patients', () => {
    render(<Counslor />);
    const totalPatientsElement = screen.getByText(/TOTAL NO. OF PATIENTS/i);
    expect(totalPatientsElement).toBeTruthy();
  });

  test('renders overall rating', () => {
    render(<Counslor />);
    const overallRatingElement = screen.getByTestId('ratings');
    expect(overallRatingElement).toBeTruthy();
  });
});
