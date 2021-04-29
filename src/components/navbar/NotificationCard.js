import React from 'react'
import CreateIcon from '@material-ui/icons/Create'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
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

function NotificationCard({ type = 'Follow', author, postName }) {
  const classes = useStyle()
  return (
    <Box className={classes.cardRoot}>
      {type === 'Follow' ? (
        <PersonAddIcon className={classes.icon} />
      ) : type === 'Create' ? (
        <CreateIcon className={classes.icon} />
      ) : null}
      <Box>
        <Typography className={classes.content}>
          HelloWorld
          fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        </Typography>
        <Box display="flex">
          <Typography className={classes.newAdd}>New</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default React.memo(NotificationCard)
