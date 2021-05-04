import { Box, CircularProgress } from '@material-ui/core'
import React from 'react'
import { use100vh } from 'react-div-100vh'

function Loading() {
  const height = use100vh()
  return (
    <Box
      bgcolor="background.default"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height={height}
      zIndex={99}
    >
      <CircularProgress color="secondary" disableShrink />
    </Box>
  )
}

export default Loading
