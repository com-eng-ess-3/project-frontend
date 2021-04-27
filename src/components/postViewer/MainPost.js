import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons'
import { ChipTag } from 'components'
import React, { useState } from 'react'
import CommentIcon from '@material-ui/icons/Comment'

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

function MainPost({ data }) {
  const classes = useStyle()
  const [isLiked, setLiked] = useState(false)

  return (
    <Paper className={classes.mainPost}>
      <Typography
        className={classes.topicText}
        color="textSecondary"
        variant="h4"
      >
        {data.topic}
        <Typography
          className={classes.titleTime}
          display="inline"
          variant="subtitle1"
        >
          {'time'}
        </Typography>
      </Typography>
      {data.tag.map((value, idx) => (
        <ChipTag
          label={value.text}
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
                  onClick={() => setLiked(true)}
                />
              ) : (
                <ThumbUpAlt
                  className={classes.clickableNode}
                  onClick={() => setLiked(false)}
                />
              )}
              <Typography className={classes.textLabel}>
                {data.likeCount}
              </Typography>
            </Box>
            <Box className={classes.actionBox}>
              <CommentIcon className={classes.clickableNode} />
              <Typography className={classes.textLabel}>
                {data.commentCount}
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
              <Avatar className={classes.avatarImg}>A</Avatar>
              <Typography className={classes.textLabel} variant="subtitle1">
                {'Username'}
              </Typography>
              <Hidden smDown>
                <Typography variant="subtitle2">{'Time'}</Typography>
              </Hidden>
            </Box>
          </Hidden>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Hidden smUp>
            <Box className={classes.authorBox}>
              <Avatar className={classes.avatarImg}>A</Avatar>
              <Typography className={classes.textLabel} variant="subtitle1">
                {'Username'}
              </Typography>
            </Box>
          </Hidden>
          <Button className={classes.followBtn}>
            <Typography variant="subtitle2">{'+ Follow'}</Typography>
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default MainPost
