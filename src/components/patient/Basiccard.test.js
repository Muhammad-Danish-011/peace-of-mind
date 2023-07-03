import { render, screen } from '@testing-library/react';
import React from 'react';
import BasicCard from './BasicCard';

describe('OutlinedCard', () => {
 
    it("renders Basic Card", () => {
        render(
          <BasicCard />
        );

        expect(screen.getByText("Psychology")).toBeInTheDocument();
    
      });
});
