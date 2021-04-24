import {
  Box,
  Button,
  InputBase,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { Link, useHistory } from 'react-router-dom'
import { auth } from 'utils/firebaseUtil'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyle = makeStyles((theme) => ({
  navBar: {
    zIndex: 99,
    position: 'fixed',
    display: 'flex',
    backgroundColor: theme.palette.secondary.main,
    height: '60px',
    top: 0,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchRoot: {
    width: '30%',
  },
  searchPaper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    paddingLeft: 5,
    width: '100%',
  },
  searchInput: {
    padding: 2,
    color: theme.palette.common.black,
    fontWeight: 400,
    width: '100%',
    paddingRight: 10,
  },
  searchIcon: {
    color: theme.palette.common.black,
    marginRight: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer',
    },
  },
  logoBox: {
    marginLeft: 20,
  },
  userBox: {
    marginRight: 20,
    display: 'flex',
    alignItems: 'center',
  },
  loginBtn: {
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
    backgroundColor: theme.palette.common.white,
    fontWeight: 'bold',
    marginRight: 9,
    borderRadius: 10,
    paddingRight: 12,
    paddingLeft: 12,
    fontSize: '1rem',
  },
  registerBtn: {
    '&:hover': {
      backgroundColor: theme.palette.success.main,
    },
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    borderRadius: 10,
    paddingRight: 12,
    paddingLeft: 12,
    fontSize: '1rem',
  },
  linkDecorator: {
    textDecoration: 'none',
  },
  avatarImg: {
    color: theme.palette.common.black,
    marginRight: 10,
  },
}))

function NavBar({ user }) {
  const history = useHistory()
  const classes = useStyle()
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box className={classes.navBar}>
      <Box className={classes.logoBox} name="logoName">
        <Typography
          component={Button}
          onClick={() => window.location.reload()}
          variant="h6"
        >
          {'GoWrite'}
        </Typography>
      </Box>
      <Box className={classes.searchRoot}>
        <Paper
          className={classes.searchPaper}
          component="form"
          onSubmit={(e) => {
            e.preventDefault()
            if (searchValue === '') return
            history.push(`/search?name=${searchValue}`)
          }}
        >
          <InputBase
            className={classes.searchInput}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
          ></InputBase>
          <SearchIcon
            className={classes.searchIcon}
            onClick={() => history.push(`/search?name=${searchValue}`)}
          />
        </Paper>
      </Box>
      <Box className={classes.userBox}>
        {!user ? (
          <React.Fragment>
            <Link to="/login" className={classes.linkDecorator}>
              <Button className={classes.loginBtn}>{'Sign In'}</Button>
            </Link>
            <Link to="/register" className={classes.linkDecorator}>
              <Button className={classes.registerBtn}>{'Sign Up'}</Button>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <AccountCircleIcon fontSize="large" />
            <Typography>{user.displayName}</Typography>
            <Button
              onClick={() => {
                auth.signOut()
              }}
            >
              {'Sign out'}
            </Button>
          </React.Fragment>
        )}
      </Box>
    </Box>
  )
}

export default React.memo(NavBar)
