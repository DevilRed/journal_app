import { useState, useMemo } from "react";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

// key are the same names as in form
const formValidations = {
  email: [(value) => value.includes("@"), "Email must have @"],
  password: [
    (value) => value.length >= 6,
    "Password must have more than 6 characters",
  ],
  displayName: [(value) => value.length >= 1, "Name is required"],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormsubmitted] = useState(false);
  const { status, errorMessage } = useSelector((state) => state.auth);
  console.log(status, errorMessage);
  const isCheckingAuthentication = useMemo(
    (status) => status === "checking",
    [status]
  );
  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setFormsubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };
  return (
    <AuthLayout title="Register">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} md={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              placeholder="John Doe"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} md={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} md={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isCheckingAuthentication}
                variant="contained"
                fullWidth
                type="submit"
              >
                Add account
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Have already an account?</Typography>
            {/* use react-router-dom with material link*/}
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
