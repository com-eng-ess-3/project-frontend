import { Box, Typography } from '@material-ui/core'
import React from 'react'

function SearchResult({ name }) {
  return (
    <React.Fragment>
      <Box>
        <Typography>{`Your query is ${name ? name : ''}`}</Typography>
      </Box>
    </React.Fragment>
  )
}

export default SearchResult
