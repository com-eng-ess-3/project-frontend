import {
  Avatar,
  Box,
  Divider,
  Hidden,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons'
import { ChipTag } from 'components'
import React, { useContext, useState } from 'react'
import CommentIcon from '@material-ui/icons/Comment'
import FollowBtn from 'components/common/FollowBtn'
import { epochToDate } from 'utils/getTime'
import {
  followUser,
  handleWhenDislike,
  handleWhenLike,
  unfollowUser,
} from 'utils/actionUtil'
import { UserContext } from 'context/userContext'

const useStyle = makeStyles((theme) => ({
  mainPost: {
    width: '60%',
    marginTop: '10px',
    padding: theme.spacing(1.5),
    height: '100%',
    maxWidth: '900px',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  actionBox: {
    display: 'flex',
  },
  vlDivider: {
    width: '2px',
    marginRight: theme.spacing(2),
  },
  textLabel: {
    marginLeft: theme.spacing(0.75),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1),
    },
  },
  hrDivider: {
    height: '2px',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  topicText: {
    wordWrap: 'break-word',
    width: '100%',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  clickableNode: {
    cursor: 'pointer',
  },
  authorBox: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarImg: {
    [theme.breakpoints.down('xs')]: {
      width: '30px',
      height: '30px',
    },
  },
  titleTime: {
    marginLeft: '20px',
  },
  actionRoot: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  followBtn: {
    color: theme.palette.success.main,
    border: `2px solid ${theme.palette.success.main}`,
    borderRadius: 10,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    [theme.breakpoints.down('xs')]: {
      width: '80%',
      marginTop: theme.spacing(0.5),
    },
  },
}))

function MainPost({ data, isLike, postId, isFollow }) {
  const classes = useStyle()
  const {
    user,
    likePostId,
    setLikePostId,
    followingList,
    setFollowingList,
  } = useContext(UserContext)
  const [isLiked, setLiked] = useState(isLike)
  const [isFollowing, setFollowing] = useState(isFollow)

  return (
    <Paper className={classes.mainPost}>
      <Typography
        className={classes.topicText}
        color="textSecondary"
        variant="h4"
      >
        {data.topic}
        <Hidden mdUp>
          <Typography
            className={classes.titleTime}
            display="inline"
            variant="subtitle1"
          >
            {epochToDate(data.timeStamp.seconds)}
          </Typography>
        </Hidden>
      </Typography>
      {data.tag.map((value, idx) => (
        <ChipTag
          color="primary"
          label={value.label}
          key={idx}
          style={{ backgroundColor: value.color }}
          onClick={() => null}
        />
      ))}
      <Divider className={classes.hrDivider} />
      <Typography
        style={{
          wordWrap: 'break-word',
          width: '100%',
          lineHeight: '30px',
          whiteSpace: 'pre-line',
        }}
        color="textSecondary"
        variant="body1"
      >
        {data.content}
      </Typography>
      <Divider light={false} className={classes.hrDivider} />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          height="100%"
        >
          <Box className={classes.actionRoot}>
            <Box display="flex">
              {!isLiked ? (
                <ThumbUpAltOutlined
                  className={classes.clickableNode}
                  onClick={async () => {
                    try {
                      data.like += 1
                      setLiked(true)
                      await handleWhenLike(postId)
                      setLikePostId([...likePostId, postId])
                    } catch (e) {
                      data.like -= 1
                      setLiked(false)
                    }
                  }}
                />
              ) : (
                <ThumbUpAlt
                  className={classes.clickableNode}
                  onClick={async () => {
                    try {
                      setLiked(false)
                      data.like -= 1
                      await handleWhenDislike(postId)
                      setLikePostId(
                        likePostId.filter((item) => item !== postId)
                      )
                    } catch {
                      setLiked(true)
                      data.like += 1
                    }
                  }}
                />
              )}
              <Typography className={classes.textLabel}>{data.like}</Typography>
            </Box>
            <Box className={classes.actionBox}>
              <CommentIcon className={classes.clickableNode} />
              <Typography className={classes.textLabel}>
                {data.currentComment}
              </Typography>
            </Box>
          </Box>
          <Divider
            orientation="vertical"
            className={classes.vlDivider}
            flexItem
          />
          <Hidden xsDown>
            <Box className={classes.authorBox}>
              <Avatar className={classes.avatarImg} src={data.urlProfile}>
                {data.displayname[0].toUpperCase()}
              </Avatar>
              <Typography className={classes.textLabel} variant="subtitle1">
                {data.displayname}
              </Typography>
              <Hidden smDown>
                <Typography variant="subtitle2">
                  {epochToDate(data.timeStamp.seconds)}
                </Typography>
              </Hidden>
            </Box>
          </Hidden>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Hidden smUp>
            <Box className={classes.authorBox}>
              <Avatar className={classes.avatarImg} src={data.urlProfile}>
                {data.displayname[0].toUpperCase()}
              </Avatar>
              <Typography className={classes.textLabel} variant="subtitle1">
                {data.displayname}
              </Typography>
            </Box>
          </Hidden>
          {!!user && user?.uid !== data.authorid ? (
            <FollowBtn
              isFollowed={isFollowing}
              setFollowed={async () => {
                let prevState = isFollowing
                try {
                  if (!isFollowing) {
                    setFollowing(true)
                    await followUser(data?.authorid)
                    setFollowingList([...followingList, data?.authorid])
                  } else {
                    setFollowing(false)
                    await unfollowUser(data?.authorid)
                    setFollowingList(
                      followingList.filter((item) => item !== data?.authorid)
                    )
                  }
                } catch (e) {
                  setFollowing(prevState)
                }
              }}
            />
          ) : null}
        </Box>
      </Box>
    </Paper>
  )
}

export default MainPost
