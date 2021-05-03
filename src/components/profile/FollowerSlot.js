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
import { UserContext } from 'context/userContext'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
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
}))

function FollowerSlot({
  value,
  setFollowingData,
  followingData,
  isFollowing,
  isLogin,
}) {
  const classes = useStyle()
  const { setFollowingList, followingList } = useContext(UserContext)
  const [isFollow, setFollow] = useState(!!isFollowing)
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar src={value.profileUrl}>
          {value.displayname[0].toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={value.displayname} />
      {isLogin ? (
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
                  await followUser(value.uid)
                  setFollowingList([...followingList, value.uid])
                  setFollowingData([...followingData, value])
                  setFollow(true)
                } catch (e) {
                  console.log(e)
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
