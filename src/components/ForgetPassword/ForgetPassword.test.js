import { render, screen, fireEvent } from '@testing-library/react';
import ForgetPassword from './ForgotPassword';
describe('ForgetPassword', () => {
    it("renders Forget Password component", () => {
        render(<ForgetPassword />);
        expect(screen.getByText("PEACE OF MIND")).toBeTruthy();
    });
    it("renders ForgetPassword component", () => {
        render(<ForgetPassword />);
        expect(screen.getByText("Forgot Password")).toBeTruthy();
    });
    it("renders Forget component", () => {
        render(<ForgetPassword />);
        expect(screen.getByText("It's okay not to be okay")).toBeTruthy();
    });
    it("renders component", () => {
        render(<ForgetPassword />);
        expect(screen.getByTestId("email")).toBeTruthy();
    });
    test('Valid Email Submission', () => {
        render(<ForgetPassword />);
        const emailInput = screen.getByRole('textbox', { name: 'Enter Your Registered Email' });
        fireEvent.change(emailInput, { target: { value: 'mohammadsabih6@gmail.com' } });
        expect(emailInput.value).toBe('mohammadsabih6@gmail.com');
      });
      test('Invalid Email Submission', () => {
        render(<ForgetPassword />);
        const emailInput = screen.getByRole('textbox', { name: 'Enter Your Registered Email' });
        fireEvent.change(emailInput, { target: { value: 'mohammadsabih7@gmail.com' } });
        expect(emailInput.value).toBe('mohammadsabih7@gmail.com');
      });
});