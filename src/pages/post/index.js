import { Box, Typography } from '@material-ui/core'
import React from 'react'

function ViewPostPage({ name }) {
  return (
    <React.Fragment>
      <Box>
        <Typography>{`Your query is ${name ? name : ''}`}</Typography>
      </Box>
    </React.Fragment>
  )
}

export default ViewPostPage
