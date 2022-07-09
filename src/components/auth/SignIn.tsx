import React, {Dispatch, useCallback} from 'react';
import { /* Redirect, */ useNavigate, Link} from 'react-router-dom';
import {
  Grid,
  TextField,
  Typography,
  Divider,
  CircularProgress,
  FormHelperText,
} from '@mui/material';
import {Button} from 'antd';
import {Box} from '@mui/system';
import useInput from '../../hooks/use-input';
import {nameValidate, passwordValidate} from '../../utils/inputValidate';
import classes from './SignIn.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {IRootDispatch, IRootStore} from '../../store/store';
import {ILocationStore} from '../../store/location/location-store';
import {isEqual} from 'lodash';

const SignIn = () => {
  const dispatch = useDispatch<IRootDispatch>()
  const navigate = useNavigate();
  const preLocation: ILocationStore = useSelector<IRootStore>((state) => state.location);

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

  const handleSubmit = useCallback((event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    localStorage.setItem('sideBarTitle', 'dashboard');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
    dispatch.user.signIn({email, password, navigate, preLocation: preLocation.location});
    //dispatch(signIn({ username: email, password }, history, preLocation));
  }, [dispatch.user, email, formIsValid, navigate, password, preLocation.location]);

  const handleKeyDown = useCallback((e) => {
    isEqual(e.key, 'Enter') && handleSubmit(e);
  }, [handleSubmit])

  const forgotPasswordHandler = () => {
    navigate('/forgot-password');

  };

  return (
    <Grid container style={{minHeight: '100vh', backgroundColor: 'white'}}>
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
          borderRadius: 1.5,
        }}
        alignItems="center"
      >
        <Grid container justifyContent="center" display={'flex'} flexDirection='column' alignItems={'center'}>
          <img src="/logo.svg" width="100px" alt="logo"/>
          <Typography component={'h2'} variant='h2'>HexFresh</Typography>
        </Grid>
        <Typography component="h4" variant="h4" sx={{textAlignLast: 'center', marginTop: '20px'}}>
          Sign In
        </Typography>
        <Box component="form" noValidate sx={{mt: 3}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            error={emailHasError}
            onBlur={emailOnBlurHandler}
            onChange={emailOnChangeHandler}
            value={email}
            helperText={
              emailHasError
                ? 'Username must not be empty'
                : ''
            }
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
          />
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              '& > :not(style)': {m: 2},
            }}
          >

            <Grid container>
              <Grid item xs>
                <div
                  className={classes['forgot-password']}
                  aria-hidden="true"
                  onClick={forgotPasswordHandler}
                >
                  Forgot password?
                  {' '}
                </div>
              </Grid>
            </Grid>

            <Button
              type="primary"
              loading={isLoading}
              size='large'
              onClick={handleSubmit}
            >
              Sign In
            </Button>

            {/*             <Divider>
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
            </Grid> */}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
