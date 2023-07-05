import { render, screen} from '@testing-library/react';
import Prevappoints from './Prevappoints'
import React from "react";
import '@testing-library/jest-dom/extend-expect';


describe("Previous appointments", () => {

    it("Heading", () => {
      render(
        <Prevappoints />
      );
      expect(screen.getByText("Previous Appointments")).toBeInTheDocument();
    });

    it("View All", () => {
        render(
          <Prevappoints />
        );
        expect(screen.getByRole("button", { name: "View all" })).toBeInTheDocument();
      });


     test("Time", () => {
  render(<Prevappoints />);
  expect(screen.getAllByText("At 6:00PM")).not.toBeNull();
});

      
});  