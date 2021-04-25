import {
  Box,
  Button,
  Divider,
  Drawer,
  InputBase,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { Link, useHistory } from 'react-router-dom'
import { auth } from 'utils/firebaseUtil'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'

const useStyle = makeStyles((theme) => ({
  root: {
    zIndex: 99,
    position: 'fixed',
    display: 'flex',
    backgroundColor: theme.palette.secondary.main,
    height: '60px',
    top: 0,
    width: '100%',
  },
  navBar: {
    width: '100%',
    height: '100%',
    display: 'flex',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
    },
  },
  searchRoot: {
    width: '40%',
    maxWidth: 800,
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
  },
  logoBox: {
    display: 'flex',
    alignItems: 'center',
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
  menuIcon: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    marginRight: theme.spacing(1),
  },
  linkDecorator: {
    textDecoration: 'none',
  },
  avatarImg: {
    color: theme.palette.common.black,
    marginRight: 10,
  },
  displayText: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    padding: theme.spacing(1),
    color: theme.palette.common.white,
  },
  clickableNode: {
    cursor: 'pointer',
  },
  leftSidePaper: {
    margin: theme.spacing(1),
    width: '100%',
    height: '100%',
    padding: 0,
    backgroundColor: theme.palette.background.default,
  },
  rootList: {
    marginTop: 0,
  },
  typoList: {
    color: theme.palette.common.white,
    fontWeight: 'bold',
    textTransform: 'none',
    borderRadius: 0,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    textAlign: 'center',
  },
}))

function NavBar({ user }) {
  const history = useHistory()
  const classes = useStyle()
  const [searchValue, setSearchValue] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [isOpenDrawer, setOpenDrawer] = useState({
    left: false,
    right: false,
  })

  const handleToggleDrawer = useCallback(
    (type, value) => {
      setOpenDrawer({ ...isOpenDrawer, [type]: value })
    },
    [isOpenDrawer]
  )
  const handleCloseUser = useCallback(() => setAnchorEl(null), [])

  return (
    <Box className={classes.root}>
      <Drawer
        PaperProps={{
          style: {
            backgroundColor: '#39ACE7',
          },
        }}
        open={isOpenDrawer?.left}
        onBackdropClick={() => handleToggleDrawer('left', false)}
      >
        <List disablePadding={true}>
          <ListItem className={classes.typoList} component={Button}>
            <ListItemText primary="Popular"></ListItemText>
          </ListItem>
          <ListItem className={classes.typoList} component={Button}>
            <ListItemText primary="Newest"></ListItemText>
          </ListItem>
          <ListItem className={classes.typoList} component={Button}>
            <ListItemText primary="Following"></ListItemText>
          </ListItem>
          <ListItem>
            <Paper className={classes.leftSidePaper}>
              <Typography>{'Hello World'}</Typography>
            </Paper>
          </ListItem>
        </List>
      </Drawer>
      <Box className={classes.navBar}>
        <Box className={classes.logoBox} name="logoName">
          <MenuIcon
            className={`${classes.menuIcon} ${classes.clickableNode}`}
            onClick={() => handleToggleDrawer('left', true)}
          />
          <Typography
            variant="h6"
            className={classes.clickableNode}
            color="textPrimary"
            onClick={() => window.location.reload()}
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
              className={`${classes.searchIcon} ${classes.clickableNode}`}
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
              <AccountCircleIcon
                className={classes.userIcon}
                fontSize="large"
              />
              <Typography
                aria-controls="simple-menu"
                aria-haspopup="true"
                variant="h6"
                className={`${classes.displayText} ${classes.clickableNode}`}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                {user.displayName}
              </Typography>
              <Menu
                anchorEl={anchorEl}
                id="simple-menu"
                keepMounted
                PaperProps={{
                  style: {
                    marginTop: 30,
                    fontSizeAdjust: '1rem',
                    color: 'white',
                    backgroundColor: '#086F98',
                  },
                }}
                BackdropProps={{
                  style: {
                    backgroundColor: 'gray',
                    opacity: '0.5',
                    marginTop: '60px',
                  },
                }}
                disableScrollLock={true}
                open={Boolean(anchorEl)}
                onBackdropClick={handleCloseUser}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Help</MenuItem>
                <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default React.memo(NavBar)
