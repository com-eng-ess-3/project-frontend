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
import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { unfollowUser } from 'utils/actionUtil'

const useStyle = makeStyles((theme) => ({
  unfollowbtn: {
    borderColor: '#f50057',
  },
  unfollowtext: {
    color: '#f50057',
  },
  avatarImg: {
    color: theme.palette.common.black,
  },
}))

function FollowingSlot({ value, setFollowingData, followingData, isLogin }) {
  const classes = useStyle()
  const history = useHistory()
  const { setFollowingList, followingList } = useContext(UserContext)
  const { setNewErrorMsg } = useContext(ErrorContext)

  return (
    <ListItem button onClick={() => history.push(`/profile/${value.uid}`)}>
      <ListItemAvatar>
        <Avatar src={value.profileUrl} className={classes.avatarImg}>
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
              } catch {
                setNewErrorMsg('Failed to unfollow user')
              }
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
