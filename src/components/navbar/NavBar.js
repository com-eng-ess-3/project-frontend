import {
  Avatar,
  Box,
  Button,
  Drawer,
  Hidden,
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
import React, { useCallback, useContext, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { auth } from 'utils/firebaseUtil'
import MenuIcon from '@material-ui/icons/Menu'
import { AllNotificationCard, NotificationBox } from './Notification'
import { UserContext } from 'context/userContext'
import AddCircleIcon from '@material-ui/icons/AddCircle'

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
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
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
    width: '250px',
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    textAlign: 'center',
  },
  drawerDisplayName: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    textAlign: 'center',
  },
}))

function NavBar() {
  const history = useHistory()
  const classes = useStyle()
  const searchQuery = new URLSearchParams(useLocation().search).get('name')

  const [searchValue, setSearchValue] = useState(searchQuery)
  const [anchorEl, setAnchorEl] = useState(null)

  const { user } = useContext(UserContext)

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
          <ListItem
            className={`${classes.typoList} ${classes.drawerDisplayName}`}
          >
            <ListItemText primary="GoWrite" />
          </ListItem>
          <ListItem
            className={classes.typoList}
            component={Button}
            onClick={() => {
              history.push(`/`)
              handleToggleDrawer('left', false)
            }}
          >
            <ListItemText primary="Home"></ListItemText>
          </ListItem>
          {!!user ? (
            <React.Fragment>
              <ListItem className={classes.typoList} component={Button}>
                <ListItemText
                  primary="Create Post"
                  onClick={() => {
                    history.push(`/create`)
                    handleToggleDrawer('left', false)
                  }}
                ></ListItemText>
              </ListItem>
              <ListItem>
                <AllNotificationCard isSideBar />
              </ListItem>
            </React.Fragment>
          ) : null}
        </List>
      </Drawer>
      <Drawer
        anchor="right"
        PaperProps={{
          style: {
            backgroundColor: '#39ACE7',
          },
        }}
        open={isOpenDrawer?.right}
        onBackdropClick={() => handleToggleDrawer('right', false)}
      >
        <List disablePadding={true}>
          {!!user ? (
            <>
              <ListItem className={classes.drawerDisplayName}>
                <ListItemText
                  primary={`Welcome : ${user.displayName}`}
                ></ListItemText>
              </ListItem>

              <ListItem
                className={classes.typoList}
                component={Button}
                onClick={() => {
                  history.push(`/profile/${user.uid}`)
                  handleToggleDrawer('right', false)
                }}
              >
                <ListItemText primary="Profile"></ListItemText>
              </ListItem>
              <ListItem
                className={classes.typoList}
                component={Button}
                onClick={() => {
                  auth.signOut()
                  handleToggleDrawer('right', false)
                }}
              >
                <ListItemText primary="Sign out"></ListItemText>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                className={classes.typoList}
                component={Button}
                onClick={() => history.push('/login')}
              >
                <ListItemText primary="Sign in"></ListItemText>
              </ListItem>
              <ListItem
                className={classes.typoList}
                component={Button}
                onClick={() => history.push('/register')}
              >
                <ListItemText primary="Register"></ListItemText>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
      <Box className={classes.navBar}>
        <Box className={classes.logoBox} name="logoName">
          <MenuIcon
            className={`${classes.menuIcon} ${classes.clickableNode}`}
            onClick={() => handleToggleDrawer('left', true)}
          />
          <Hidden xsDown>
            <Typography
              variant="h6"
              className={classes.clickableNode}
              style={{ color: 'white' }}
              onClick={() => history.push('/')}
            >
              {'GoWrite'}
            </Typography>
          </Hidden>
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
              value={!!searchValue ? searchValue : ''}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
            ></InputBase>
            <SearchIcon
              className={`${classes.searchIcon} ${classes.clickableNode}`}
              onClick={() => {
                if (searchValue !== '') {
                  history.push(`/search?name=${searchValue}`)
                }
              }}
            />
          </Paper>
        </Box>
        <Box className={classes.userBox}>
          <Hidden xsDown>
            {!!user ? (
              <React.Fragment>
                <AddCircleIcon
                  className={classes.clickableNode}
                  fontSize="large"
                  onClick={() => history.push('/create')}
                />
                <NotificationBox user={user} />
              </React.Fragment>
            ) : null}
          </Hidden>
          <Hidden smUp>
            <Avatar
              src={user?.profileUrl}
              className={classes.clickableNode}
              fontSize="large"
              onClick={() => handleToggleDrawer('right', true)}
            >
              {user?.displayName[0].toUpperCase()}
            </Avatar>
          </Hidden>
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
            <Hidden xsDown>
              <Box
                display="flex"
                alignItems="center"
                className={classes.clickableNode}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <Avatar fontSize="large" src={user?.profileUrl}>
                  {user.displayName[0].toUpperCase()}
                </Avatar>
                <Typography
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  variant="h6"
                  className={`${classes.displayText} ${classes.clickableNode}`}
                >
                  {user.displayName}
                </Typography>
              </Box>
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
                style={{ marginTop: 10 }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                disableScrollLock={true}
                open={Boolean(anchorEl)}
                onBackdropClick={handleCloseUser}
                onKeyUp={handleCloseUser}
              >
                <MenuItem onClick={() => history.push(`/profile/${user?.uid}`)}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
              </Menu>
            </Hidden>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default React.memo(NavBar)
