import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { authSlice } from "../../../src/store/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

describe("LoginPage", () => {
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
});
