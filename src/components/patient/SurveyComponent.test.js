import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import React from "react";
import ResizeObserver from 'resize-observer-polyfill';

import SurveyComponent from './SurveyComponent';
// import SurveyModal from './SurveyModal';

// import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import SurveyComponent from './SurveyComponent';


global.ResizeObserver = ResizeObserver;

jest.mock('react-s3', () => ({
  uploadFile: jest.fn(),
}));



//1 

describe("Survey component", () => {

  it("renders survey header correctly", () => {
    render(
      <SurveyComponent />
    );
    expect(screen.getByText("Mental Health Intake Form")).toBeInTheDocument();
    expect(screen.getByText("It's okay, not to be okay.")).toBeInTheDocument();

  });

  //2

  it("renders survey note correctly", () => {
    render(
      <SurveyComponent />
    );
    expect(screen.getByText("Note:")).toBeInTheDocument();
    expect(screen.getByText("By participating in this survey, you will play a vital role in helping us understand your needs, all you data will remain private and confidential.")).toBeInTheDocument();
  })

  //3

  it('Renders survey form1', () => {
    render(<SurveyComponent />);

    const question1 = screen.getByLabelText(/^Are you currently\s\*$/i);

    expect(question1).toBeInTheDocument();
  });

  //4

  it('Renders survey form2', () => {
    render(<SurveyComponent />);

    const question2 = screen.getByLabelText(/^Are you\s\*$/i);

    expect(question2).toBeInTheDocument();
  });

  //5

  it('renders survey form3', () => {
    render(<SurveyComponent />);
    const question3 = screen.getByText(/Primary Care Physician/i);
    expect(question3).toBeInTheDocument();
  });

  //6

  it('renders survey form4', () => {
    render(<SurveyComponent />);
    const question4 = screen.getByText(/Current Therapist \/ Counselor/i);
    expect(question4).toBeInTheDocument();
  });

  //7

  it('renders survey form5', () => {
    render(<SurveyComponent />);
    const question5 = screen.getByText(/Therapist's Phone Number/i);
    expect(question5).toBeInTheDocument();
  });

  //8

  it('renders survey form6', () => {
    render(<SurveyComponent />);
    const question6 = screen.getByLabelText(/Please list the problem\(s\) which you are seeking help\? /i);
    expect(question6).toBeInTheDocument();
  });

  //9

  it('Tests the presence of required field "Current Symptoms *"', () => {
    render(<SurveyComponent />);

    const question7 = screen.getByLabelText(/Current Symptoms \*/i);

    expect(question7).toBeInTheDocument();
  });

  //10

  it('Question about feelings or thoughts of not wanting to live is rendered', () => {
    render(<SurveyComponent />);

    const question8 = screen.getByLabelText(/Have you ever had feelings or thoughts that you didn't want to live\? \*/);

    expect(question8).toBeInTheDocument();
  });

  //11

  it('Question about feeling not wanting to live is rendered', () => {
    render(<SurveyComponent />);

    const questionLabel = screen.getByLabelText(/Do you currently feel that you don't want to live\? \*/i);

    expect(questionLabel).toBeInTheDocument();
  });

  //12

  it('Question "How often do you have these thoughts?" is matched correctly', () => {
    render(<SurveyComponent />);

    const questionLabel = screen.getByLabelText(/How often do you have these thoughts\? \*/i);

    expect(questionLabel).toBeInTheDocument();
  });

  //13

  it('Question about feeling hopeless and/or worthless is rendered', () => {
    render(<SurveyComponent />);

    const questionLabel = screen.getByLabelText(/Do you feel hopeless and\/or worthless\? \*/i);

    expect(questionLabel).toBeInTheDocument();
  });

  // 14

  it('Button is matched correctly', () => {
    render(<SurveyComponent />);

    const buttonElement = screen.getByText(/next/i);

    expect(buttonElement).toBeInTheDocument();
  });

  describe('SurveyComponent Tests', () => {

    //15

    it('SurveyComponent renders without errors', () => {
      render(
        <BrowserRouter>
          <SurveyComponent />
        </BrowserRouter>
      );
    });
  });
});
