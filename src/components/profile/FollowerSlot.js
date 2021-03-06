import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { ErrorContext } from 'context/ErrorContext'
import { UserContext } from 'context/userContext'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { followUser } from 'utils/actionUtil'

const useStyle = makeStyles((theme) => ({
  followedbtn: {
    borderColor: '#c8e6c9',
  },
  followedText: {
    color: '#c8e6c9',
  },

  followbtn: {
    borderColor: theme.palette.success.main,
  },
  followText: {
    color: theme.palette.success.main,
  },
  avatarImg: {
    color: theme.palette.common.black,
  },
}))

function FollowerSlot({
  value,
  setFollowingData,
  followingData,
  isFollowing,
  isLogin,
  isMyself,
}) {
  const history = useHistory()
  const classes = useStyle()

  const { setFollowingList, followingList } = useContext(UserContext)
  const { setNewErrorMsg } = useContext(ErrorContext)
  const [isFollow, setFollow] = useState(!!isFollowing)

  return (
    <ListItem button onClick={() => history.push(`/profile/${value.uid}`)}>
      <ListItemAvatar>
        <Avatar src={value.profileUrl} className={classes.avatarImg}>
          {value.displayname[0].toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={value.displayname} />
      {isLogin && !isMyself ? (
        isFollow ? (
          <ListItemSecondaryAction>
            <Button variant="outlined" className={classes.followedbtn}>
              <Typography className={classes.followedText}>followed</Typography>
            </Button>
          </ListItemSecondaryAction>
        ) : (
          <ListItemSecondaryAction>
            <Button
              variant="outlined"
              className={classes.followbtn}
              onClick={async () => {
                try {
                  if (!isLogin) {
                    setNewErrorMsg('Please Login First')
                    history.push('/login')
                    return
                  }
                  await followUser(value.uid)
                  setFollowingList([...followingList, value.uid])
                  setFollowingData([...followingData, value])
                  setFollow(true)
                } catch (e) {
                  setNewErrorMsg('Failed to follow user')
                  console.log(e.message)
                }
              }}
            >
              <Typography className={classes.followText}>+ follow</Typography>
            </Button>
          </ListItemSecondaryAction>
        )
      ) : null}
    </ListItem>
  )
}

export default React.memo(FollowerSlot)
