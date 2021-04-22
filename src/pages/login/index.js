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
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    display: 'flex',
  },
  authContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
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
    backgroundColor: theme.palette.primary.main,
  },
  alternativeText: {
    display: 'flex',
    justifyContent: 'center',
    margin: 5,
  },
  signInUpText: {
    marginRight: 5,
  },
}))

function LoginPage() {
  const userAuth = useContext(AuthContext)
  const classes = useStyle()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
          <Button className={classes.loginButton} variant="contained">
            {'Login'}
          </Button>
          <Divider className={classes.divider} orientation="horizontal" />
          <Box className={classes.alternativeText}>
            <Typography className={classes.signInUpText}>
              {'If you did not have account , '}
            </Typography>
            <Link to="/register">{'Sign up'}</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage
