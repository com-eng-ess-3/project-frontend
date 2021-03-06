import {
  Avatar,
  Box,
  Card,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons'
import CommentIcon from '@material-ui/icons/Comment'
import { ChipTag } from 'components'
import FollowBtn from 'components/common/FollowBtn'
import ModifyButtonSet from 'components/common/ModifyButtonSet'
import { ErrorContext } from 'context/ErrorContext'
import { UserContext } from 'context/userContext'
import React, { memo, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import {
  followUser,
  handleWhenDislike,
  handleWhenLike,
  unfollowUser,
} from 'utils/actionUtil'
import { epochToDate } from 'utils/getTime'

const useStyle = makeStyles((theme) => ({
  cardContainer: {
    width: '80%',
    maxWidth: '800px',
    borderRadius: 10,
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(1.5),
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  authorBox: {
    display: 'flex',
    alignItems: 'center',
  },
  dividerLine: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  actionBox: {
    display: 'flex',
    marginLeft: theme.spacing(1),
    width: '100%',
  },
  likeCountBox: {
    display: 'flex',
    marginRight: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  commentCountBox: {
    display: 'flex',
    color: theme.palette.text.secondary,
  },
  avatarImg: {
    color: theme.palette.common.black,
  },
  textLabel: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
    textAlign: 'center',
  },
  pointerCursor: {
    cursor: 'pointer',
  },
  topicText: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: '#0784B5',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  contentText: {
    wordBreak: 'break-word',
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1.5),
  },
  readMoreText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
}))

function CardPost({ user, id, post, isLike, following }) {
  const history = useHistory()
  const {
    setLikePostId,
    likePostId,
    setFollowingList,
    followingList,
  } = useContext(UserContext)

  const { setNewErrorMsg } = useContext(ErrorContext)
  const [isLiked, setLiked] = useState(isLike)
  const [isFollowing, setFollowing] = useState(following)

  const classes = useStyle()

  useEffect(() => {
    setFollowing(following)
  }, [following])

  return (
    <Card className={classes.cardContainer}>
      <Box className={classes.headerContainer}>
        <Box className={classes.authorBox}>
          <Box
            display="flex"
            alignItems="center"
            style={{ cursor: 'pointer' }}
            onClick={() => history.push(`/profile/${post.authorid}`)}
          >
            <Avatar className={classes.avatarImg} src={post?.urlProfile}>
              {post?.displayname[0].toUpperCase()}
            </Avatar>
            <Typography className={classes.textLabel} variant="h6">
              {post?.displayname}
            </Typography>
          </Box>
          <Typography className={classes.textLabel} variant="subtitle2">
            {epochToDate(post?.timeStamp.seconds)}
          </Typography>
        </Box>
        {user && user.uid !== post?.authorid ? (
          <FollowBtn
            isFollowed={isFollowing}
            setFollowed={async () => {
              let prevState = isFollowing
              try {
                if (!isFollowing) {
                  setFollowing(true)
                  await followUser(post?.authorid)
                  setFollowingList([...followingList, post?.authorid])
                } else {
                  setFollowing(false)
                  await unfollowUser(post?.authorid)
                  setFollowingList(
                    followingList.filter((item) => item !== post?.authorid)
                  )
                }
              } catch (e) {
                console.log(e.message)
                setFollowing(prevState)
              }
            }}
          />
        ) : null}
      </Box>
      <Divider className={classes.dividerLine} />
      <Box>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography
            variant="h4"
            className={`${classes.topicText}`}
            onClick={() => history.push(`/post/${post.postId}`)}
          >
            {post?.topic}
          </Typography>
          {post?.tag.map((value, idx) => (
            <ChipTag
              color="primary"
              label={value.label}
              key={idx}
              style={{ backgroundColor: value.color }}
              onClick={() => null}
            />
          ))}
        </Box>
        <Typography noWrap className={classes.contentText}>
          {post?.content}
        </Typography>
        <Typography
          className={`${classes.readMoreText} ${classes.pointerCursor}`}
          onClick={() => history.push(`/post/${post?.postId}`)}
        >
          {'Read More'}
        </Typography>
      </Box>
      <Divider className={classes.dividerLine} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box className={classes.actionBox}>
          <Box className={classes.likeCountBox}>
            {!isLiked || !user ? (
              <ThumbUpAltOutlined
                className={classes.pointerCursor}
                onClick={async () => {
                  try {
                    if (!user) {
                      setNewErrorMsg('Please login first')
                      history.push(`/login`)
                      return
                    }
                    post.like += 1
                    setLiked(true)
                    await handleWhenLike(id)
                    setLikePostId([...likePostId, id])
                  } catch (e) {
                    setNewErrorMsg('Failed to do like action')
                    post.like = Math.max(post.like - 1, 0)
                    setLiked(false)
                  }
                }}
              />
            ) : (
              <ThumbUpAlt
                className={classes.pointerCursor}
                onClick={async () => {
                  try {
                    post.like = Math.max(post.like - 1, 0)
                    setLiked(false)
                    await handleWhenDislike(id)
                    setLikePostId(likePostId.filter((item) => item !== id))
                  } catch (e) {
                    setNewErrorMsg('Failed to do dislike action')
                    post.like += 1
                    setLiked(true)
                  }
                }}
              />
            )}
            <Typography className={classes.textLabel}>{post?.like}</Typography>
          </Box>
          <Box className={classes.commentCountBox}>
            <CommentIcon />
            <Typography className={classes.textLabel}>
              {post?.currentComment}
            </Typography>
          </Box>
        </Box>
        {user?.uid === post?.authorid ? (
          <ModifyButtonSet postid={post.postId} />
        ) : null}
      </Box>
    </Card>
  )
}

export default memo(CardPost)
