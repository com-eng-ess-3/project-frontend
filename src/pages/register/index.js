import { Box, Button, Divider, makeStyles, Typography } from '@material-ui/core'
import { AuthContext } from 'context/userContext'
import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Banner, TextFieldStyled } from 'components'

const useStyle = makeStyles((theme) => ({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
  contentContainer: {
    display: 'flex',
  },
  authContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    width: '300px',
    padding: 5,
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
    backgroundColor: theme.palette.background.default,
  },
  alternativeText: {
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.text.primary,
    margin: 5,
  },
  signInUpText: {
    color: theme.palette.common.black,
    marginRight: 5,
  },
}))

function RegisterPage() {
  const userAuth = useContext(AuthContext)
  const classes = useStyle()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  if (userAuth.user !== null) {
    return <Redirect to="/" />
  }

  return (
    <Box className={classes.pageContainer}>
      <Box className={classes.contentContainer}>
        <Banner />
        <Box className={classes.authContainer}>
          <TextFieldStyled
            variant="outlined"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextFieldStyled
            variant="outlined"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextFieldStyled
            variant="outlined"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button className={classes.loginButton} variant="contained">
            {'Register'}
          </Button>
          <Divider className={classes.divider} orientation="horizontal" />
          <Box className={classes.alternativeText}>
            <Typography className={classes.signInUpText}>
              {'If you already have account , '}
            </Typography>
            <Link to="/login">{'Sign in'}</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default RegisterPage
