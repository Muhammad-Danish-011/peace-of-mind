import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SignupForm from "./SignupPage";
describe("SignupForm", () => {
    
    it("renders SignupForm component", () => {
      render(<SignupForm />);
      expect(screen.getByText("PEACE OF MIND")).toBeInTheDocument();
    });
    it("renders Forget component", () => {
        render(<SignupForm />);
        expect(screen.getByText("It's okay not to be okay")).toBeInTheDocument();
    });
    it('displays error message when required fields are not filled', () => {
        render(<SignupForm />);
        const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
        fireEvent.click(signUpButton);
        const firstNameError = screen.getByText('First Name is required');
        expect(firstNameError).toBeInTheDocument();
        const lastNameError = screen.getByText('Last Name is required');
        expect(lastNameError).toBeInTheDocument();
        const phoneNumberError = screen.getByText('Phone number is required');
        expect(phoneNumberError).toBeInTheDocument();
        const addressError = screen.getByText('Address is required');
        expect(addressError).toBeInTheDocument();
        const genderError = screen.getByText('Gender is required');
        expect(genderError).toBeInTheDocument();
        const cnicError = screen.getByText('CNIC is required');
        expect(cnicError).toBeInTheDocument();
        const passwordError = screen.getByText('Password is required');
        expect(passwordError).toBeInTheDocument();
        const roleError = screen.getByText('Role is required');
        expect(roleError).toBeInTheDocument();
    });
    it("displays error message when required fields  filled", () => {
        const { getByText } = render(<SignupForm />);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const submitButton = getByText("Sign Up", { selector: 'button.MuiButton-containedPrimary' });
        fireEvent.click(submitButton);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const errorMessage = getByText("First Name is required");
        expect(errorMessage).toBeInTheDocument();
      });
      it('renders the form fields', () => {
        render(<SignupForm />);
        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/CNIC/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Counselor/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Patient/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Male/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Female/i)).toBeInTheDocument();
        expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
      });
});