import {
  Avatar,
  Box,
  Button,
  InputBase,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
  navBar: {
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
  const classes = useStyle()

  return (
    <Box className={classes.navBar}>
      <Box className={classes.logoBox} name="logoName">
        <Typography variant="h6">{'GoWrite'}</Typography>
      </Box>
      <Box className={classes.searchRoot} name="searchBar">
        <Paper className={classes.searchPaper} component="form">
          <SearchIcon className={classes.searchIcon} />
          <InputBase
            className={classes.searchInput}
            placeholder="Search"
          ></InputBase>
        </Paper>
      </Box>
      <Box className={classes.userBox}>
        {user ? (
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
            <Avatar
              alt="Remy Sharp"
              src="/broken-image.jpg"
              className={classes.avatarImg}
            >
              B
            </Avatar>
            <Typography>Hello World</Typography>
          </React.Fragment>
        )}
      </Box>
    </Box>
  )
}

export default NavBar
