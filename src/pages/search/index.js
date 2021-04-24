import { Box, Typography } from '@material-ui/core'
import { NavBar } from 'components'
import { AuthContext } from 'context/userContext'
import React, { useContext } from 'react'

function SearchResult({ name }) {
  const userState = useContext(AuthContext)

  return (
    <React.Fragment>
      <NavBar user={userState?.user} />
      <Box>
        <Typography>{`Your query is ${name ? name : ''}`}</Typography>
      </Box>
    </React.Fragment>
  )
}

export default SearchResult
