import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import LoginPage from "./LoginPage";
import { AuthProvider } from "../Authcontext/AuthContext";
import { MemoryRouter as Router } from "react-router-dom";
describe("SignupForm", () => {
  it("renders SignupForm component", () => {
    render(
        <Router>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </Router>
    );
    expect(screen.getByText("PEACE OF MIND")).toBeInTheDocument();
  });
  it("renders Forget component", () => {
    render(
      <Router>
        <AuthProvider>
            <LoginPage />
        </AuthProvider>
      </Router>
    );
    expect(screen.getByText("It's okay not to be okay")).toBeInTheDocument();
  });
  test('renders login form without errors', () => {
    render(
      <Router>
        <AuthProvider>
        <LoginPage />
        </AuthProvider>
      </Router>
    );
    expect(screen.getByText('PEACE OF MIND')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });
  test('login with correct credentials', () => {
    render(<Router><AuthProvider><LoginPage/></AuthProvider></Router>);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText("Login");
    fireEvent.change(emailInput, { target: { value: "mohammadsabih6@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345678" } });
    fireEvent.click(submitButton);
  });
  test('login with incorrect credentials', async () => {
    render(<Router><AuthProvider><LoginPage/></AuthProvider></Router>);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText("Login");
    fireEvent.change(emailInput, { target: { value: "mohammadsabih68@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456788" } });
    fireEvent.click(submitButton);
    expect(emailInput).toHaveValue("mohammadsabih68@gmail.com");
    expect(passwordInput).toHaveValue("123456788");
  });
});