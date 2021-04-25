import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router'

function ProfilePage() {
  const id = useParams().id
  return (
    <React.Fragment>
      <Box>
        <Typography>{`Your query is ${id ? id : ''}`}</Typography>
      </Box>
    </React.Fragment>
  )
}

export default ProfilePage
