import React from 'react'
import CreateIcon from '@material-ui/icons/Create'
import { Box, makeStyles, Typography } from '@material-ui/core'

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
  },
}))

function NotificationCard({ type }) {
  const classes = useStyle()
  return (
    <Box className={classes.cardRoot}>
      <CreateIcon className={classes.icon} />
      <Typography className={classes.content}>
        HelloWorld
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      </Typography>
    </Box>
  )
}

export default React.memo(NotificationCard)
