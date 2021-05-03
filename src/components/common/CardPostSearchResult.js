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
  cardPSRContainer: {
    // PSR = Post Search Result
    alignItems: 'center',
    width: '95%',
    borderRadius: 10,
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(1.5),
  },
  cardPSRHeadContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  dividerLine: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  cardPSRButtomContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(0),
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
    marginTop: theme.spacing(0),
  },
  authorBox: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarImg: {
    color: theme.palette.common.black,
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}))

function CardPostSearchResult({ user, index }) {
  const isLogin = false
  const isFollowed = false
  const classes = useStyle({ isLogin, isFollowed })
  const [isLiked, setLiked] = useState(false)

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
      text: 'Kimuji',
    },
    {
      color: purple[500],
      text: '18+',
    },
    {
      color: blue[500],
      text: 'Hentai',
    },
  ]

  return (
    <Card className={classes.cardPSRContainer}>
      <Box className={classes.cardPSRHeadContainer}>
        <Box className={classes.topicAndTagContainer}>
          <Box>
            <Typography variant="h4" className={classes.topicText}>
              {'How to musterbation?'}
            </Typography>
          </Box>
          <Box marginLeft="5px">
            {tag.map((value, idx) => (
              <ChipTag
                label={value.text}
                key={idx}
                style={{ backgroundColor: value.color }}
                onClick={() => null}
              />
            ))}
          </Box>
        </Box>
        {user ? (
          <Button className={classes.followBtn}>
            {isFollowed ? 'followed' : '+ follow'}
          </Button>
        ) : null}
      </Box>
      <Box className={classes.contentContainer}>
        <Typography className={classes.contentText} overflowWrap="break-word">
          {
            'นี้คือการทดสอบการพิมพ์ภา ษาไทยยยdzfbzbvdvSVddddddddddddddddddddddddddddddxxxxxxxxxxxxxxxx\nddlnlln l l l  , , lllllddmddndnmd'
          }
        </Typography>
      </Box>
      <Divider className={classes.dividerLine} />
      <Box className={classes.cardPSRButtomContainer}>
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
        <Box className={classes.authorBox}>
          <Avatar className={classes.avatarImg}>K</Avatar>
          <Typography className={classes.textLabel} variant="h6">
            {'Username'}
          </Typography>
          <Typography
            className={classes.textLabel}
            variant="subtitle1"
            display="flex"
          >
            {'time'}
          </Typography>
        </Box>
      </Box>
    </Card>
    //   <Card className={classes.cardContainer}>
    //     <Box className={classes.headerContainer}>
    //       <Box className={classes.authorBox}>
    //         <Avatar className={classes.avatarImg}>A</Avatar>
    //         <Typography className={classes.textLabel} variant="h6">
    //           {'Username'}
    //         </Typography>
    //         <Typography className={classes.textLabel} variant="subtitle1">
    //           {'Time'}
    //         </Typography>
    //       </Box>
    //       {user ? (
    //         <Button className={classes.followBtn}>
    //           {isFollowed ? 'followed' : '+ follow'}
    //         </Button>
    //       ) : null}
    //     </Box>
    //     <Divider className={classes.dividerLine} />
    //     <Box>
    //       <Box display="flex" alignItems="center" flexWrap="wrap">
    //         <Typography variant="h4" className={classes.topicText}>
    //           {'How to write JS in VS Code'}
    //         </Typography>
    //         {tag.map((value, idx) => (
    //           <ChipTag
    //             label={value.text}
    //             key={idx}
    //             style={{ backgroundColor: value.color }}
    //             onClick={() => null}
    //           />
    //         ))}
    //       </Box>
    //       <Typography className={classes.contentText} overflowWrap="break-word">
    //         {'นี้คือการทดสอบการพิมพ์ภาษาไทยยย'}
    //       </Typography>
    //     </Box>
    //     <Divider className={classes.dividerLine} />
    //     <Box className={classes.actionBox}>
    //       <Box className={classes.likeCountBox}>
    //         {!isLiked ? (
    //           <ThumbUpAltOutlined
    //             className={classes.pointerCursor}
    //             onClick={() => setLiked(true)}
    //           />
    //         ) : (
    //           <ThumbUpAlt
    //             className={classes.pointerCursor}
    //             onClick={() => setLiked(false)}
    //           />
    //         )}
    //         <Typography className={classes.textLabel}>999</Typography>
    //       </Box>
    //       <Box className={classes.commentCountBox}>
    //         <CommentIcon className={classes.pointerCursor} />
    //         <Typography className={classes.textLabel}>999</Typography>
    //       </Box>
    //     </Box>
    //   </Card>
  )
}

export default memo(CardPostSearchResult)
