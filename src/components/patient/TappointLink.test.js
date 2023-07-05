import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from "react";
import TappointLink from './TappointLink';


describe("Today's Appointment", () => {

  it("First Heading", () => {
    render(
      <TappointLink />
    );
    expect(screen.getByText("Today's Appointment")).toBeInTheDocument();
  });

  it("Date $ Time", () => {
    render(
      <TappointLink />
    );
    expect(screen.getByText("Date & Time: 22 May-2023 Friday 6:00PM")).toBeInTheDocument();
  });

  it("Zoom Meet", () => {
    render(
      <TappointLink />
    );
    expect(screen.getByText("Today's Meeting Link: www.zoom.com")).toBeInTheDocument();
  });
});