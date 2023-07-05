import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Search from './Search';

describe('Search', () => {
  
  it('renders placeholder ', () => {
    render(
      <Router>
        <Search />
      </Router>
    );

    const placeholderText = screen.getByPlaceholderText('Search here');
    expect(placeholderText).toBeTruthy();
   
  });

  it('renders search button', () => {
    render(
      <Router>
        <Search />
      </Router>
    );

    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeTruthy();
  });
});
