import React, { useState } from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications'
import {
  Backdrop,
  Badge,
  Box,
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

  return (
    <React.Fragment>
      <Badge color="error" variant="dot" invisible={true}>
        <NotificationsIcon
          className={classes.notificationIcon}
          fontSize="large"
          onClick={(e) => setAnchorEl(e.currentTarget)}
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
            <Box padding={2}>
              <Typography>Hello Worlddddddddddddddd</Typography>
            </Box>
          </Popover>
        </Backdrop>
      </Badge>
    </React.Fragment>
  )
}

export default NotificationBox
