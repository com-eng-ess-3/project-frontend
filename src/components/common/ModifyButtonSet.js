import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'

const useStyle = makeStyles((theme) => ({
  editBtn: {
    color: theme.palette.success.main,
    padding: theme.spacing(0.5),
    fontSize: '0.8rem',
    border: `2px solid ${theme.palette.success.main}`,
    borderRadius: 10,
  },
}))

function ModifyButtonSet({ postid }) {
  const history = useHistory()
  const classes = useStyle()
  return (
    <Button
      variant="outlined"
      className={classes.editBtn}
      onClick={() => history.push(`/edit/${postid}`)}
    >
      {'Edit'}
    </Button>
  )
}

export default ModifyButtonSet
