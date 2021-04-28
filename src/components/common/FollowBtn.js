import { Button, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles((theme) => ({
  followBtn: {
    '&:hover': {
      backgroundColor: (props) =>
        !props.isFollowed
          ? theme.palette.background.dark
          : theme.palette.common.white,
    },
    border: `2px solid ${theme.palette.background.dark}`,
    display: 'flex',
    color: (props) =>
      props.isFollowed
        ? theme.palette.text.secondary
        : theme.palette.common.white,
    backgroundColor: (props) =>
      !props.isFollowed
        ? theme.palette.background.dark
        : theme.palette.common.white,

    borderRadius: 10,
    right: 0,
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem',
    },
    textTransform: 'none',
  },
}))

function FollowBtn({ isFollowed, setFollowed }) {
  const classes = useStyle({ isFollowed })
  return (
    <Button
      className={classes.followBtn}
      onClick={(e) => setFollowed(!isFollowed)}
    >
      {isFollowed ? 'Followed' : '+ Follow'}
    </Button>
  )
}

export default FollowBtn
