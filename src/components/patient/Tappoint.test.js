import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from "react";
import Tappoint from './Tappoint';


describe("Today's Appointment First card", () => {

    it("render Today's Appointment", () => {
      render(
        <Tappoint />
      );
      expect(screen.getByText("Today's Appointments")).toBeInTheDocument();
    });

    test("Time", () => {
        render( <Tappoint />);
        expect(screen.getAllByText("At 6:00PM")).not.toBeNull();
      });

      it("View All", () => {
        render(
            <Tappoint />
        );
        expect(screen.getByRole("button", { name: "View all" })).toBeInTheDocument();
      });
      
});