import {
  Avatar,
  Box,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons'
import { ErrorContext } from 'context/ErrorContext'
import { UserContext } from 'context/userContext'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { handleWhenDislike, handleWhenLike } from 'utils/actionUtil'
import { epochToDate } from 'utils/getTime'

const useStyle = makeStyles((theme) => ({
  rootPaper: {
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1.5),
    width: '60%',
    maxWidth: '900px',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  textLabel: {
    marginLeft: theme.spacing(0.75),
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
  },
  hrDivider: {
    height: '2px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  commentContent: {
    color: theme.palette.text.secondary,
    lineHeight: '25px',
    textWeight: 'bold',
  },
  clickableNode: {
    cursor: 'pointer',
  },
  likeCountBox: {
    display: 'flex',
    color: theme.palette.text.secondary,
  },
  avatarImg: {
    color: theme.palette.common.black,
  },
}))

function CommentBox({ comment, index, commentId, postId, isLike, isLogin }) {
  const classes = useStyle()
  const history = useHistory()

  const { setNewErrorMsg } = useContext(ErrorContext)

  const { likeCommentId, setLikeCommentId } = useContext(UserContext)
  const [isLiked, setLiked] = useState(isLike)

  return (
    <Paper className={classes.rootPaper}>
      <Typography
        style={{ textWeight: 'bold' }}
        variant="subtitle2"
      >{`Comment #${index + 1}`}</Typography>
      <Typography variant="body2" className={classes.commentContent}>
        {comment.content}
      </Typography>
      <Divider className={classes.hrDivider} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            style={{ cursor: 'pointer' }}
            onClick={() => history.push(`/profile/${comment.uid}`)}
          >
            <Avatar src={comment.urlProfile} className={classes.avatarImg}>
              {comment.displayname[0].toUpperCase()}
            </Avatar>
            <Typography className={classes.textLabel} variant="subtitle1">
              {comment.displayname}
            </Typography>
          </Box>
          <Typography className={classes.textLabel} variant="subtitle2">
            {epochToDate(comment.timeStamp.seconds)}
          </Typography>
        </Box>
        <Box display="flex" className={classes.likeCountBox}>
          {!isLiked || !isLogin ? (
            <ThumbUpAltOutlined
              className={`${classes.clickableNode} `}
              onClick={async () => {
                try {
                  if (!isLogin) {
                    setNewErrorMsg('Please login first')
                    history.replace(`/login`)
                    return
                  }
                  comment.like += 1
                  setLiked(true)
                  await handleWhenLike(postId, commentId)
                  setLikeCommentId([...likeCommentId, commentId])
                } catch (e) {
                  console.log(e)
                  comment.like -= 1
                  setLiked(false)
                }
              }}
            />
          ) : (
            <ThumbUpAlt
              className={classes.clickableNode}
              onClick={async () => {
                try {
                  comment.like -= 1
                  setLiked(false)
                  await handleWhenDislike(postId, commentId)
                  setLikeCommentId(
                    likeCommentId.filter((item) => item !== commentId)
                  )
                } catch (e) {
                  setNewErrorMsg('Failed to do dislike action')
                  comment.like += 1
                  setLiked(true)
                }
              }}
            />
          )}
          <Typography className={classes.textLabel}>{comment.like}</Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default React.memo(CommentBox)
