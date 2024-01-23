import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";

export const LoginPage = () => {
  const { email, password, onInputChange } = useForm({
    email: "thulio@hotmail.com",
    password: "123456",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
  };

  const onGoogleSignIn = () => {
    console.log("on google sign in");
  };
  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
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

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth onClick={onGoogleSignIn}>
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
