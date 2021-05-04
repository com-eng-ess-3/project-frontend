import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { use100vh } from 'react-div-100vh'
import { Link } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: (props) => props?.height,
  },
  linkBack: {
    '&:hover': {
      backgroundColor: theme.palette.common.black,
    },
    color: theme.palette.common.white,
    marginTop: 10,
    backgroundColor: theme.palette.common.black,
  },
}))

function NotFound() {
  const height = use100vh()
  const classes = useStyle({ height })

  return (
    <Box className={classes.root}>
      <Typography variant="h3">{'404 Not Found'}</Typography>
      <Link to="/" className={classes.linkBack} component={Button}>
        {'Back to main page'}
      </Link>
    </Box>
  )
}

export default NotFound
