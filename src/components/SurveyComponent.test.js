import { render, screen } from '@testing-library/react';
import React from "react";
import ResizeObserver from 'resize-observer-polyfill';
import '@testing-library/jest-dom/extend-expect';

import SurveyComponent from './SurveyComponent';
import SurveyModal from './SurveyModal';

global.ResizeObserver = ResizeObserver;

jest.mock('react-s3', () => ({
    uploadFile: jest.fn(),
  }));

  describe("Survey component", () => {


    it('renders modal icon', () => {
        render(<SurveyModal />);
    
        // Use appropriate selector to target the modal icon element
        const modalIcon = screen.getByRole({name:'InsertDriveFileRoundedIcon'});
    
        // Assert that the modal icon element is in the document
        expect(modalIcon).toBeInTheDocument();
      });

    it("renders survey header correctly", () => {
        render(
            <SurveyComponent />
        );
        expect(screen.getByText("Mental Health Intake Form")).toBeInTheDocument();
        expect(screen.getByText("It's okay, not to be okay.")).toBeInTheDocument();

    });

    it("renders survey note correctly", () => {
        render(
            <SurveyComponent />
        );
        expect(screen.getByText("Note:")).toBeInTheDocument();
        expect(screen.getByText("By participating in this survey, you will play a vital role in helping us understand your needs, all you data will remain private and confidential.")).toBeInTheDocument();
    })


    //q1

    test('Renders survey form Q1', () => {
        render(<SurveyComponent />);

        const question1 = screen.getByLabelText(/^Are you currently\s\*$/i);

        expect(question1).toBeInTheDocument();
    });

    //q2


     test('Renders survey form Q2', () => {
         render(<SurveyComponent />);

         const question2 = screen.getByLabelText(/^Are you\s\*$/i);

         expect(question2).toBeInTheDocument();
     });

    //q3
    it('renders survey form Q3', () => {
        render(<SurveyComponent />);
        const question3 = screen.getByText(/Primary Care Physician/i);
        expect(question3).toBeInTheDocument();
    });

    //q4

    it('renders survey form Q4', () => {
        render(<SurveyComponent />);
        const question4 = screen.getByText(/Current Therapist \/ Counselor/i);
        expect(question4).toBeInTheDocument();
    });


    //q5
    it('renders survey form Q5', () => {
        render(<SurveyComponent />);
        const question5 = screen.getByText(/Therapist's Phone Number/i);
        expect(question5).toBeInTheDocument();
    });

    //q6

    it('renders survey form Q6', () => {
        render(<SurveyComponent />);
        const question6 = screen.getByLabelText(/Please list the problem\(s\) which you are seeking help\? /i);
        expect(question6).toBeInTheDocument();
    });

    

test('Tests the presence of required field "Current Symptoms *"', () => {
  render(<SurveyComponent />);
  
  const question7 = screen.getByLabelText(/Current Symptoms \*/i);
  
  expect(question7).toBeInTheDocument();
});



test('Question about feelings or thoughts of not wanting to live is rendered', () => {
  render(<SurveyComponent />);
  
  const question8 = screen.getByLabelText(/Have you ever had feelings or thoughts that you didn't want to live\? \*/);
  
  expect(question8).toBeInTheDocument();
});



test('Question about feeling not wanting to live is rendered', () => {
  render(<SurveyComponent />);
  
  const questionLabel = screen.getByLabelText(/Do you currently feel that you don't want to live\? \*/i);
  
  expect(questionLabel).toBeInTheDocument();
});



test('Question "How often do you have these thoughts?" is matched correctly', () => {
  render(<SurveyComponent />);
  
  const questionLabel = screen.getByLabelText(/How often do you have these thoughts\? \*/i);
  
  expect(questionLabel).toBeInTheDocument();
});



test('Question about feeling hopeless and/or worthless is rendered', () => {
  render(<SurveyComponent />);
  
  const questionLabel = screen.getByLabelText(/Do you feel hopeless and\/or worthless\? \*/i);
  
  expect(questionLabel).toBeInTheDocument();
});


    //next button

    test('Button is matched correctly', () => {
        render(<SurveyComponent />);

        const buttonElement = screen.getByText(/next/i);

        expect(buttonElement).toBeInTheDocument();
    });

});
