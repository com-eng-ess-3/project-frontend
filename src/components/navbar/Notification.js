import React, { useState } from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications'
import {
  Backdrop,
  Badge,
  Box,
  Divider,
  makeStyles,
  Popover,
  Typography,
} from '@material-ui/core'

const useStyle = makeStyles((theme) => ({
  notificationIcon: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    cursor: 'pointer',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#C4C4C4',
    marginTop: theme.spacing(7.5),
  },
  notificationPaper: {
    top: 0,
    position: 'fixed',
    marginTop: theme.spacing(7.5),
  },
}))

function NotificationBox({ isNavBar, user }) {
  const classes = useStyle()
  const [anchorEl, setAnchorEl] = useState(null)
  const [isNewPost, setNewPost] = useState(false)

  return (
    <React.Fragment>
      <Badge
        className={classes.notificationIcon}
        color="error"
        variant="dot"
        invisible={!isNewPost}
      >
        <NotificationsIcon
          fontSize="large"
          onClick={(e) => {
            setAnchorEl(e.currentTarget)
            setNewPost(false)
          }}
        />

        <Backdrop className={classes.backdrop} open={Boolean(anchorEl)}>
          <Popover
            anchorEl={anchorEl}
            id="simple-popover"
            disableScrollLock={true}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            style={{ marginTop: 10, marginRight: 10 }}
          >
            <AllNotificationCard />
          </Popover>
        </Backdrop>
      </Badge>
    </React.Fragment>
  )
}

function AllNotificationCard({ isSideBar }) {
  return (
    <Box
      padding={isSideBar ? 1 : 2}
      height={isSideBar ? '77vh' : '80vh'}
      overflow="auto"
      width={isSideBar ? '200px' : '250px'}
      style={{ backgroundColor: '#FFF' }}
    >
      <Typography
        color="secondary"
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 10,
        }}
        variant="h5"
      >
        Notification
      </Typography>
      <Divider />
    </Box>
  )
}

export { NotificationBox, AllNotificationCard }
