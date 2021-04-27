import { Box, Button, Divider, makeStyles, Typography } from '@material-ui/core'
import { Banner, TextFieldStyled } from 'components'
import { AuthContext } from 'context/userContext'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth, firestore } from 'utils/firebaseUtil'

const useStyle = makeStyles((theme) => ({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
  },
  authContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    backgroundColor: theme.palette.background.paper,
    width: '60%',
    borderRadius: 10,
    padding: theme.spacing(2),
  },
  loginButton: {
    '&:hover': {
      backgroundColor: theme.palette.success.main,
    },
    margin: 5,
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    fontWeight: 700,
  },
  divider: {
    margin: 5,
    marginTop: 15,
    height: 2,
    backgroundColor: theme.palette.primary.main,
  },
  alternativeText: {
    display: 'flex',
    justifyContent: 'center',
    margin: 5,
  },
  signUpText: {
    marginRight: 5,
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
  },
  signUpDescription: {
    marginRight: 5,
  },
  errorMsg: {
    margin: 5,
    color: theme.palette.error.main,
    fontWeight: 'bold',
  },
}))

function AuthComponent({ isRegister, urlRedirect }) {
  const isRegisterPage = !!isRegister
  const history = useHistory()
  const classes = useStyle()

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errorMsg, setErrorMsg] = useState('')

  const userAuth = useContext(AuthContext)

  const handleAuthAction = React.useCallback(async () => {
    if (isRegisterPage) {
      try {
        if (password !== confirmPassword) {
          throw new Error('Your Confirm Password is not match')
        }

        if (!displayName) {
          throw new Error('Your display name cannot be empty')
        }

        const userAuth = await auth.createUserWithEmailAndPassword(
          email,
          password
        )

        userAuth.user.updateProfile({ displayName })
        await firestore.collection('users').doc(userAuth.user.uid).set({
          follower: [],
          following: [],
          interested: '',
          status: '',
        })
        history.push(!!urlRedirect ? `${urlRedirect}` : '/')
      } catch (e) {
        const code = e?.code
        if (code === 'auth/email-already-in-use') {
          setErrorMsg('This email is already register')
        } else if (code === 'auth/invalid-email') {
          setErrorMsg('The email address is badly formatted.')
        } else if (code === 'auth/weak-password') {
          setErrorMsg('The password must be at least 6 characters')
        } else {
          setErrorMsg(e.message)
        }
        return
      }
    } else {
      try {
        await auth.signInWithEmailAndPassword(email, password)
        history.push(!!urlRedirect ? `${urlRedirect}` : '/')
      } catch (e) {
        const code = e?.code
        if (code === 'auth/invalid-email') {
          setErrorMsg('Your email is not valid')
        } else if (
          code === 'auth/wrong-password' ||
          code === 'auth/user-not-found'
        ) {
          setErrorMsg('Your email or password is not correct')
        }
        return
      }
    }
  }, [
    confirmPassword,
    displayName,
    email,
    history,
    isRegisterPage,
    password,
    urlRedirect,
  ])

  useEffect(() => {
    if (userAuth.user !== null) {
      history.push(!!urlRedirect ? `${urlRedirect}` : '/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box className={classes.pageContainer}>
      <Box className={classes.contentContainer}>
        <Banner />
        <Box className={classes.authContainer}>
          {!!errorMsg ? (
            <Typography className={classes.errorMsg}>{errorMsg}</Typography>
          ) : null}
          {isRegisterPage ? (
            <TextFieldStyled
              variant="outlined"
              placeholder="Handle Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          ) : null}
          <TextFieldStyled
            variant="outlined"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextFieldStyled
            variant="outlined"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegisterPage ? (
            <TextFieldStyled
              variant="outlined"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          ) : null}
          <Button
            className={classes.loginButton}
            onClick={handleAuthAction}
            variant="contained"
          >
            {isRegisterPage ? 'Register' : 'Sign in'}
          </Button>
          <Divider className={classes.divider} orientation="horizontal" />
          <Box className={classes.alternativeText}>
            <Typography className={classes.signUpDescription}>
              {isRegisterPage
                ? 'If you already have account , '
                : 'If you did not have account , '}
              <Link
                className={classes.signUpText}
                to={isRegisterPage ? '/login' : '/register'}
              >
                {isRegisterPage ? 'Sign in' : 'Sign up'}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default React.memo(AuthComponent)
