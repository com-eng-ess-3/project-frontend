import { Box, CircularProgress } from '@material-ui/core'
import React from 'react'

function Loading() {
  return (
    <Box
      bgcolor="background.default"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
      zIndex={99}
    >
      <CircularProgress color="secondary" disableShrink />
    </Box>
  )
}

export default Loading
