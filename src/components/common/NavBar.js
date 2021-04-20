import { Box, makeStyles, Typography } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import React from 'react'

const useStyle = makeStyles({
  navBar: {
    position: 'fixed',
    display: 'flex',
    backgroundColor: red[500],
    height: '50px',
    top: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function NavBar() {
  const classes = useStyle()

  return (
    <Box className={classes.navBar}>
      <Typography>This is nav bar</Typography>
    </Box>
  )
}

export default NavBar
