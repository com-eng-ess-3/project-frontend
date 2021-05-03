import { Backdrop, Box, CircularProgress } from '@material-ui/core'
import React from 'react'

function Loading() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
    >
      <Backdrop open={true}>
        <CircularProgress color="primary" disableShrink />
      </Backdrop>
    </Box>
  )
}

export default Loading
