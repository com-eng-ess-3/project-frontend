import {
  Avatar,
  Box,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
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
}))

function CommentBox({ comment, index }) {
  const classes = useStyle()
  const [isLiked, setLiked] = useState(false)

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
              onClick={() => setLiked(true)}
            />
          ) : (
            <ThumbUpAlt
              className={classes.clickableNode}
              onClick={() => setLiked(false)}
            />
          )}
          <Typography className={classes.textLabel}>{comment.like}</Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default React.memo(CommentBox)
