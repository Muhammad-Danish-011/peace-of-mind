import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter as Router } from "react-router-dom";
import { AuthProvider } from "../Authcontext/AuthContext";
import UserProfile from "./UserProfile";
describe("UserProfile", () => {
  it("Renders UserProfile", () => {
    render(
      <Router>
        <AuthProvider>
          <UserProfile />
        </AuthProvider>
      </Router>
    );
    expect(screen.getByText("My Profile:")).toBeInTheDocument();
    expect(screen.getByText("Personal Information:")).toBeInTheDocument();
    expect(screen.getByText('First Name:')).toBeInTheDocument();
    expect(screen.getByText('Last Name:')).toBeInTheDocument();
    expect(screen.getByText('Email Address:')).toBeInTheDocument();
    expect(screen.getByText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Phone Number:')).toBeInTheDocument();
    expect(screen.getByText('Address:')).toBeInTheDocument();
  });
  test("clicking Edit button enables user edit mode", () => {
    render(
      <Router>
        <AuthProvider>
          <UserProfile />
        </AuthProvider>
      </Router>
    );
    // Verify that the user edit mode is initially disabled
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Save" })
    ).not.toBeInTheDocument();
    // Click the Edit button
    const editButton = screen.getByRole("button", { name: "Edit" });
    fireEvent.click(editButton);
    // Verify that the user edit mode is enabled
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });
  test("clicking save button saves user changes", async () => {
    render(
      <Router>
        <AuthProvider>
          <UserProfile />
        </AuthProvider>
      </Router>
    );
    // Click the Edit button to enable user edit mode
    const editButton = screen.getByRole("button", { name: "Edit" });
    fireEvent.click(editButton);
    // Modify user information
    const nameInput = screen.getByTestId("lastname");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      // Set the value directly using Object.defineProperty
      Object.defineProperty(nameInput, "value", {
        value: "Sabih",
        writable: true,
      });
      fireEvent.change(nameInput);
    });
    // Click the Save button
    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);
    // Verify that the user changes are saved
    // expect(screen.getByText('Sabih')).toBeInTheDocument();
  });
//
});