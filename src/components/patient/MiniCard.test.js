import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from "react";
import MiniCard from './MiniCard';

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
}));

describe("MiniCard", () => {

    it("BOOK NOW!", () => {
        render(
            <MiniCard />
        );
        expect(screen.getByRole("button", { name: "Book Now" })).toBeInTheDocument();
    });

    it("Previous Counsulted Councler", () => {
        render(
            <MiniCard />
        );
        expect(screen.getByText("Previous Counsulted Councler")).toBeInTheDocument();
    });


    it("renders the 'Social Psychologist' text", () => {
        render(<MiniCard />);
        expect(screen.getByText("Social Psychologist")).toBeInTheDocument();
    });

    it("renders Aoun Ali", () => {
        render(<MiniCard />);
        expect(screen.getByText("Aoun Ali")).toBeInTheDocument();
    });
});