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
import { UserContext } from 'context/userContext'
import React, { memo, useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { handleWhenDislike, handleWhenLike } from 'utils/actionUtil'
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
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    width: '100%',
  },
  likeCountBox: {
    display: 'flex',
    marginRight: theme.spacing(3),
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
  },
  pointerCursor: {
    '&:hover': {
      cursor: 'pointer',
    },
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

function CardPost({ user, id, post, editMode, isLike }) {
  const history = useHistory()
  const { setLikePostId, likePostId } = useContext(UserContext)
  const [isLiked, setLiked] = useState(isLike)
  const [isFollowed, setFollowed] = useState(false)

  const classes = useStyle()

  return (
    <Card className={classes.cardContainer}>
      <Box className={classes.headerContainer}>
        <Box className={classes.authorBox}>
          <Avatar className={classes.avatarImg} src={post.urlProfile}>
            {post.displayname[0].toUpperCase()}
          </Avatar>
          <Typography className={classes.textLabel} variant="h6">
            {post.displayname}
          </Typography>
          <Typography className={classes.textLabel} variant="subtitle2">
            {epochToDate(post.timeStamp.seconds)}
          </Typography>
        </Box>
        {user ? (
          <FollowBtn isFollowed={isFollowed} setFollowed={setFollowed} />
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
            {post.topic}
          </Typography>
          {post.tag.map((value, idx) => (
            <ChipTag
              color="primary"
              label={value.label}
              key={idx}
              style={{ backgroundColor: value.color }}
              onClick={() => null}
            />
          ))}
        </Box>
        <Typography className={classes.contentText}>{post.content}</Typography>
        <Typography
          className={`${classes.readMoreText} ${classes.pointerCursor}`}
          onClick={() => history.push(`/post/${post.postId}`)}
        >
          {'Read More'}
        </Typography>
      </Box>
      <Divider className={classes.dividerLine} />
      <Box className={classes.actionBox}>
        <Box className={classes.likeCountBox}>
          {!isLiked ? (
            <ThumbUpAltOutlined
              className={classes.pointerCursor}
              onClick={async () => {
                try {
                  post.like += 1
                  setLiked(true)
                  await handleWhenLike(id)
                  setLikePostId([...likePostId, id])
                } catch (e) {
                  post.like -= 1
                  setLiked(false)
                }
              }}
            />
          ) : (
            <ThumbUpAlt
              className={classes.pointerCursor}
              onClick={async () => {
                try {
                  post.like -= 1
                  setLiked(false)
                  await handleWhenDislike(id)
                  setLikePostId(likePostId.filter((item) => item !== id))
                } catch (e) {
                  post.like += 1
                  setLiked(true)
                  console.log(e.message)
                }
              }}
            />
          )}
          <Typography className={classes.textLabel}>{post.like}</Typography>
        </Box>
        <Box className={classes.commentCountBox}>
          <CommentIcon className={classes.pointerCursor} />
          <Typography className={classes.textLabel}>
            {post.currentComment}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default memo(CardPost)
