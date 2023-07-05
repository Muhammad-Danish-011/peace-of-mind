import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from "react";
import SurveyModal from './SurveyModal';

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
  }));

describe("Survey Modal", () => {

    it("Take our Mental Health Survey!", () => {
        render(
            <SurveyModal />
        );
        expect(screen.getByText("Take our Mental Health Survey!")).toBeInTheDocument();
    });

    it("We care about you", () => {
        render(
            <SurveyModal />
        );
        expect(screen.getByText("We care about your well-being and would like to invite you to take our mental health survey.")).toBeInTheDocument();
    });

    it("Fill out survey", () => {
        render(
            <SurveyModal />
        );
        expect(screen.getByText("Fill out survey")).toBeInTheDocument();
    });

    it("Skip", () => {
        render(
            <SurveyModal />
        );
        expect(screen.getByText("Skip")).toBeInTheDocument();
    });
    
});