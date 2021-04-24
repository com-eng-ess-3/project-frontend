import { Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'

function EditPost({ id }) {
  const history = useHistory()

  if (id === '') {
    history.push('/')
    return null
  }

  return <Typography>{'This is create post page'}</Typography>
}

export default EditPost
