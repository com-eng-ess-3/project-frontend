import { Box, Typography } from '@material-ui/core'
import { NavBar } from 'components'
import { UserContext } from 'context/userContext'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'

function SearchResult({ name }) {
  const userState = useContext(UserContext)
  const history = useHistory()

  if (name === '') {
    history.push('/')
    return null
  }

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
