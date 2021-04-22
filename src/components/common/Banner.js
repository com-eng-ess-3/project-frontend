import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    [theme.breakpoints.up('lg')]: {
      marginRight: 200,
    },
  },
  description: {
    width: 500,
    marginTop: 20,
    fontWeight: 400,
    fontSize: '1rem',
    wordWrap: 'break-word',
  },
}))

function Banner() {
  const classes = useStyle()

  return (
    <Box className={classes.container}>
      <Typography color="secondary" variant="h3">
        {'GoWrite'}
      </Typography>
      <Typography color="primary" className={classes.description}>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
      </Typography>
    </Box>
  )
}

export default Banner
