import { Backdrop, CircularProgress } from '@material-ui/core'
import React from 'react'

function Loading() {
  return (
    <Backdrop open={true}>
      <CircularProgress color="primary" disableShrink />
    </Backdrop>
  )
}

export default Loading
