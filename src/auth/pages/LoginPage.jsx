import { Google } from "@mui/icons-material";
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
import { useDispatch } from "react-redux";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth/thunks";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const formData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };
  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} md={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@google.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email}
            />
          </Grid>

          <Grid item xs={12} md={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="password"
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password}
            />
          </Grid>

          <Grid container display={!!errorMessage ? "" : "none"} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            {/* use react-router-dom with material link*/}
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Add account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
