import React from 'react';
import { /* Redirect, */ useNavigate, Link } from 'react-router-dom';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
  CircularProgress,
  FormHelperText,
} from '@mui/material';
import { Box } from '@mui/system';
import useInput from '../../hooks/use-input';
import { nameValidate, passwordValidate } from '../../utils/inputValidate';
import classes from './SignIn.module.css';

const SignIn = () => {
  const history = useNavigate();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    value: email,
    valueIsValid: emailIsValid,
    valueHasError: emailHasError,
    onBlurHandler: emailOnBlurHandler,
    onChangeHandler: emailOnChangeHandler,
  } = useInput(nameValidate);

  const {
    value: password,
    valueIsValid: passwordIsValid,
    valueHasError: passwordHasError,
    onBlurHandler: passwordOnBlurHandler,
    onChangeHandler: passwordOnChangeHandler,
  } = useInput(passwordValidate);


  const formIsValid = emailIsValid && passwordIsValid;

  const submitHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    //dispatch(signIn({ username: email, password }, history, preLocation));
  };

  const forgotPasswordHandler = () => {
    if (!email && email.trim() === '') {
      // dispatch(showModal('You need to provide your email first!.'));
      return;
    }

  };

  return (
    <Grid container style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Grid
        item
        xs={12}
        sm={12}
        sx={{
          display: 'grid',
          flexDirection: 'column',
          alignItems: 'stretch',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          maxWidth: 'fit-content !important',
          '& > :not(style)': {},
          padding: '2rem',
          margin: 'auto',
          border: '2px solid #f1f1f1',
          borderRadius:1.5,
        }}
        alignItems="center"
      >
        <Grid container justifyContent="center" display={'flex'} flexDirection='column' alignItems={'center'}>
          <img src="/logo.svg" width="100px" alt="logo" />
          <Typography component={'h2'} variant='h2'>HexFresh</Typography>
        </Grid>
        <Typography component="h4" variant="h4" sx={{ textAlignLast: 'center', marginTop: '20px' }}>
          Sign In
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={emailHasError}
            onBlur={emailOnBlurHandler}
            onChange={emailOnChangeHandler}
            value={email}
            helperText={
              emailHasError
                ? 'Username must not be empty and include \'@\' if it is email and is a number if it is your studentID'
                : ''
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordHasError}
            onBlur={passwordOnBlurHandler}
            onChange={passwordOnChangeHandler}
            value={password}
            helperText={
              passwordHasError ? 'Pass must has more than 8 characters.' : ''
            }
          />
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              '& > :not(style)': { m: 2 },
            }}
          >
            <Button
              onClick={submitHandler}
              variant="contained"
              /* sx={{
                maxHeight: 70,
                borderRadius: 4,
                height: 50,
                fontSize: 20,
                textTransform: 'none',
                maxWidth: 160,
              }} */
            >
              {isLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <div
                  className={classes['forgot-password']}
                  aria-hidden="true"
                  onClick={forgotPasswordHandler}
                >
                  Forgot password?
                  {' '}
                  {isLoading ? <CircularProgress size={15} /> : ''}
                </div>
              </Grid>
              <Grid item>
                <Link to="/signup">Don&apos;t have an account? Sign Up</Link>
              </Grid>
            </Grid>

            <Divider>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{ opacity: 0.7, fontWeight: 400, marginBottom: '-7px' }}
              >
                Or With
              </Typography>
            </Divider>
            <Grid
              container
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                '& > :not(style)': { m: 2 },
              }}
            >
              {/* <GoogleSignin /> */}
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
