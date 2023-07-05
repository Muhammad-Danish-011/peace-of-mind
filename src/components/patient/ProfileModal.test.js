import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileModal from './ProfileModal';

describe('ProfileModal', () => {
  it("opens the 'Profile' menu item and navigates to '/user-profile' when clicked", () => {
    render(
      <Router>
        <ProfileModal />
      </Router>
    );

    const profileMenuItem = screen.getByText('Profile');
    fireEvent.click(profileMenuItem);

    expect(screen.getByText('Profile')).toBeInTheDocument();

  });

  it("opens the 'Logout' menu item and navigates to 'Logout' when clicked", () => {
    render(
      <Router>
        <ProfileModal />
      </Router>
    );

    const profileMenuItem = screen.getByText('Logout');
    fireEvent.click(profileMenuItem);

    expect(screen.getByText('Logout')).toBeInTheDocument();

  });
});
