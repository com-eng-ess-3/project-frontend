import {
  Avatar,
  Box,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons'
import { UserContext } from 'context/userContext'
import React, { useContext, useState } from 'react'
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
}))

function CommentBox({ comment, index, commentId, postId, isLike }) {
  const classes = useStyle()
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
          <Avatar src={comment.urlProfile}>
            {comment.displayname[0].toUpperCase()}
          </Avatar>
          <Typography className={classes.textLabel} variant="subtitle1">
            {comment.displayname}
          </Typography>
          <Typography className={classes.textLabel} variant="subtitle2">
            {epochToDate(comment.timeStamp.seconds)}
          </Typography>
        </Box>
        <Box display="flex">
          {!isLiked ? (
            <ThumbUpAltOutlined
              className={classes.clickableNode}
              onClick={async () => {
                try {
                  setLiked(true)
                  comment.like += 1
                  await handleWhenLike(postId, commentId)
                  setLikeCommentId([...likeCommentId, commentId])
                } catch {
                  setLiked(false)
                  comment.like -= 1
                }
              }}
            />
          ) : (
            <ThumbUpAlt
              className={classes.clickableNode}
              onClick={async () => {
                try {
                  setLiked(false)
                  comment.like -= 1
                  await handleWhenDislike(postId, commentId)
                  setLikeCommentId(
                    likeCommentId.filter((item) => item !== commentId)
                  )
                } catch {
                  setLiked(true)
                  comment.like += 1
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
