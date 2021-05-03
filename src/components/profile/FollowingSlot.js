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
import React, { useContext } from 'react'
import { unfollowUser } from 'utils/actionUtil'

const useStyle = makeStyles((theme) => ({
  unfollowbtn: {
    borderColor: '#f50057',
  },
  unfollowtext: {
    color: '#f50057',
  },
}))

function FollowingSlot({ value, setFollowingData, followingData, isLogin }) {
  const classes = useStyle()
  const { setFollowingList, followingList } = useContext(UserContext)

  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar src={value.profileUrl}>
          {value?.displayname[0].toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={value.displayname} />
      <ListItemSecondaryAction>
        {isLogin ? (
          <Button
            variant="outlined"
            className={classes.unfollowbtn}
            onClick={async () => {
              try {
                await unfollowUser(value.uid)
                setFollowingList(
                  followingList.filter((item) => item !== value.uid)
                )
                setFollowingData(
                  followingData.filter((item) => item.uid !== value.uid)
                )
              } catch {}
            }}
          >
            <Typography className={classes.unfollowtext}>
              {'Unfollow'}
            </Typography>
          </Button>
        ) : null}
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default React.memo(FollowingSlot)
