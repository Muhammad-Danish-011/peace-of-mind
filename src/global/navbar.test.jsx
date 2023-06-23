import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar component', () => {
  const handleSidebarToggle = jest.fn();

  it('renders without crashing', () => {
    render(<Navbar handleSidebarToggle={handleSidebarToggle} />);
  });

  it('calls handleSidebarToggle when sidebar button is clicked', () => {
    render(<Navbar handleSidebarToggle={handleSidebarToggle} />);
    const button = screen.getByLabelText('open sidebar');
    fireEvent.click(button);
    expect(handleSidebarToggle).toHaveBeenCalled();
  });
});
