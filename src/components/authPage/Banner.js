import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(20),
    },
  },
  description: {
    width: 500,
    marginTop: 20,
    fontWeight: 400,
    wordWrap: 'break-word',
    whiteSpace: 'pre-line',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

function Banner() {
  const classes = useStyle()

  return (
    <Box className={classes.container}>
      <Typography color="secondary" variant="h2">
        {'GoWrite'}
      </Typography>
      <Typography
        variant="h5"
        color="secondary"
        className={classes.description}
      >
        {`GoWrite, drive the world with knowledge.
          Want to share some facts, just go write it!`}
      </Typography>
    </Box>
  )
}

export default Banner
