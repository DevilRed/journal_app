import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { authSlice } from "../../../src/store/auth/authSlice";
import { notAuthenticatedState } from "../../fixtures/authFixtures";
import { startGoogleSignIn } from "../../../src/store/auth/thunks";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

// mock function should start with mock
const mockStartLoginWithEmailPassword = vi.fn();

vi.mock("../../../src/store/auth/thunks", () => {
  const mockStartGoogleSignIn = vi.fn();
  return {
    startGoogleSignIn: mockStartGoogleSignIn,
    // pass params to be called on the mock
    startLoginWithEmailPassword: ({ email, password }) =>
      mockStartLoginWithEmailPassword({ email, password }),
  };
});

// mock dispatch only from redux
vi.mock("react-redux", async () => {
  // keep original implementation
  const actual = await vi.importActual("react-redux");
  const dispatch = vi.fn();
  dispatch.mockReturnValue(() => (fn) => fn());
  return {
    ...actual,
    useDispatch: dispatch,
  };
});

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should render ok", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  it("google btn should call startGoogleSignIn", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText("google-btn");
    fireEvent.click(googleBtn);
    expect(startGoogleSignIn).toHaveBeenCalled();
  });

  it("onSubmit should be called with data and call startLoginWithEmailPassword", () => {
    const email = "thulio@google.com";
    const password = "123456";
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailField, { target: { name: "email", value: email } });

    const passwordField = screen.getByTestId("password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    const loginForm = screen.getByLabelText("submit-form");
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email: email,
      password: password,
    });
  });
});
