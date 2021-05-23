import { Button, makeStyles } from '@material-ui/core'
import { ErrorContext } from 'context/ErrorContext'
import { UserContext } from 'context/userContext'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { followUser, unfollowUser } from 'utils/actionUtil'

const useStyle = makeStyles((theme) => ({
  followBtn: {
    '&:hover': {
      backgroundColor: (props) =>
        !props.isFollowing
          ? theme.palette.background.dark
          : theme.palette.common.white,
    },
    border: `2px solid ${theme.palette.background.dark}`,
    display: 'flex',
    color: (props) =>
      props.isFollowing
        ? theme.palette.text.secondary
        : theme.palette.common.white,
    backgroundColor: (props) =>
      !props.isFollowing
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

function FollowBtn({ isFollowed, authorId }) {
  const [isFollowing, setFollowing] = useState(isFollowed)
  const { followingList, setFollowingList } = useContext(UserContext)
  const { setNewErrorMsg } = useContext(ErrorContext)

  const classes = useStyle({ isFollowing })

  const handleFollow = useCallback(async () => {
    let prevState = isFollowing
    try {
      if (!isFollowing) {
        setFollowing(true)
        await followUser(authorId)
        setFollowingList([...followingList, authorId])
      } else {
        setFollowing(false)
        await unfollowUser(authorId)
        setFollowingList(followingList.filter((item) => item !== authorId))
      }
    } catch (e) {
      setNewErrorMsg('Failed to do follow / unfollow action')
      console.log(e.message)
      setFollowing(prevState)
    }
  }, [authorId, followingList, isFollowing, setFollowingList, setNewErrorMsg])

  useEffect(() => {
    setFollowing(isFollowed)
  }, [isFollowed])

  return (
    <Button className={classes.followBtn} onClick={(e) => handleFollow()}>
      {isFollowing ? 'Followed' : '+ Follow'}
    </Button>
  )
}

export default FollowBtn
