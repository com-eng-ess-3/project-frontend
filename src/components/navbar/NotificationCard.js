import React from 'react'
import CreateIcon from '@material-ui/icons/Create'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { isNewNotification } from 'utils/getTime'

const useStyle = makeStyles((theme) => ({
  cardRoot: {
    display: 'flex',
    marginTop: theme.spacing(2),
    width: '100%',
  },
  icon: {
    marginRight: theme.spacing(0.75),
    color: theme.palette.secondary.main,
  },
  content: {
    wordBreak: 'break-word',
    color: theme.palette.secondary.main,
    width: '170px',
  },
  newAdd: {
    border: `2px solid ${theme.palette.error.main}`,
    width: 'fit-content',
    borderRadius: 10,
    color: theme.palette.error.main,
    fontSize: '0.75rem',
    paddingLeft: theme.spacing(0.75),
    paddingRight: theme.spacing(0.75),
  },
}))

function NotificationCard({ type, data }) {
  const classes = useStyle()
  if (!data) {
    data = {}
  }
  return (
    <Box className={classes.cardRoot}>
      {type === 'Follow' ? (
        <PersonAddIcon className={classes.icon} />
      ) : type === 'Create' ? (
        <CreateIcon className={classes.icon} />
      ) : null}
      <Box>
        {type === 'Create' ? (
          <React.Fragment>
            <Typography noWrap className={classes.content}>
              {`${data.displayname} has a new post`}
            </Typography>
            <Typography noWrap className={classes.content}>
              {data.topic}
            </Typography>
          </React.Fragment>
        ) : type === 'Follow' ? (
          <Typography noWrap={true}>
            HelloWorld
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
          </Typography>
        ) : null}
        {isNewNotification(data.timeStamp) ? (
          <Box display="flex">
            <Typography className={classes.newAdd}>New</Typography>
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

export default React.memo(NotificationCard)
