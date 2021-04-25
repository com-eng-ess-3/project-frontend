import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { blue, green, purple, red, yellow } from '@material-ui/core/colors'
import { ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons'
import CommentIcon from '@material-ui/icons/Comment'
import { ChipTag } from 'components'
import React, { memo, useState } from 'react'

const useStyle = makeStyles((theme) => ({
  cardContainer: {
    width: '92%',
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
  followBtn: {
    '&:hover': {
      backgroundColor: (props) =>
        !props.isFollowed
          ? theme.palette.background.dark
          : theme.palette.common.white,
    },
    border: `2px solid ${theme.palette.background.dark}`,
    display: 'flex',
    color: (props) =>
      props.isFollowed
        ? theme.palette.text.secondary
        : theme.palette.common.white,
    backgroundColor: (props) =>
      !props.isFollowed
        ? theme.palette.background.dark
        : theme.palette.common.white,

    borderRadius: 10,
    right: 0,
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
    fontWeight: 'bold',
  },
  contentText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1.5),
  },
}))

function CardPost({ user, index }) {
  const isLogin = false
  const isFollowed = false
  const classes = useStyle({ isLogin, isFollowed })
  const [isLiked, setLiked] = useState(false)

  console.log('render ' + index)

  const tag = [
    {
      color: green[500],
      text: 'Hello',
    },
    {
      color: yellow[900],
      text: 'Dev',
    },
    {
      color: red[500],
      text: 'React',
    },
    {
      color: purple[500],
      text: 'Frontend',
    },
    {
      color: blue[500],
      text: 'Hello',
    },
  ]

  return (
    <Card className={classes.cardContainer}>
      <Box className={classes.headerContainer}>
        <Box className={classes.authorBox}>
          <Avatar className={classes.avatarImg}>A</Avatar>
          <Typography className={classes.textLabel} variant="h6">
            {'Username'}
          </Typography>
          <Typography className={classes.textLabel} variant="subtitle1">
            {'Time'}
          </Typography>
        </Box>
        {user ? (
          <Button className={classes.followBtn}>
            {isFollowed ? 'followed' : '+ follow'}
          </Button>
        ) : null}
      </Box>
      <Divider className={classes.dividerLine} />
      <Box>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography variant="h4" className={classes.topicText}>
            {'How to write JS in VS Code'}
          </Typography>
          {tag.map((value, idx) => (
            <ChipTag
              label={value.text}
              key={idx}
              style={{ backgroundColor: value.color }}
              onClick={() => null}
            />
          ))}
        </Box>
        <Typography className={classes.contentText} overflowWrap="break-word">
          {'นี้คือการทดสอบการพิมพ์ภาษาไทยยย'}
        </Typography>
      </Box>
      <Divider className={classes.dividerLine} />
      <Box className={classes.actionBox}>
        <Box className={classes.likeCountBox}>
          {!isLiked ? (
            <ThumbUpAltOutlined
              className={classes.pointerCursor}
              onClick={() => setLiked(true)}
            />
          ) : (
            <ThumbUpAlt
              className={classes.pointerCursor}
              onClick={() => setLiked(false)}
            />
          )}
          <Typography className={classes.textLabel}>999</Typography>
        </Box>
        <Box className={classes.commentCountBox}>
          <CommentIcon className={classes.pointerCursor} />
          <Typography className={classes.textLabel}>999</Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default memo(CardPost)
