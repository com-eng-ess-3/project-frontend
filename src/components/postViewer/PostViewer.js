import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { TextFieldStyled } from 'components'
import Loading from 'components/common/Loading'
import { ErrorContext } from 'context/ErrorContext'
import { UserContext } from 'context/userContext'
import React, { useContext, useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useHistory } from 'react-router'
import { createCommentInPost, getCommentInPost } from 'utils/commentUtil'
import { checkElementInsideArray, getPostById } from 'utils/postUtil'
import CommentBox from './CommentBox'
import MainPost from './MainPost'

const useStyle = makeStyles((theme) => ({
  rootBox: {
    width: '100%',
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    paddingBottom: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '80px',
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(3),
      marginTop: '60px',
    },
  },
  commentBox: {
    marginTop: theme.spacing(0),
    overflowY: 'hidden',
  },
  paperStyle: {
    width: '80%',
    marginTop: '10px',
    padding: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      width: '60%',
    },
  },
  makeCommentPaper: {
    width: '60%',
    maxWidth: '900px',
    marginTop: '10px',
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
      width: '90%',
      height: '30px',
    },
  },
  commentField: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  avatarIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.common.black,
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(1),
    },
  },
  sendBtn: {
    color: theme.palette.success.main,
    borderRadius: 10,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    border: `2px solid ${theme.palette.success.main}`,
    marginRight: theme.spacing(1),
  },

  clickableNode: {
    cursor: 'pointer',
  },
}))

function PostViewer({ id }) {
  const classes = useStyle()
  const history = useHistory()
  const { user, likePostId, likeCommentId, followingList } = useContext(
    UserContext
  )
  const { setNewErrorMsg } = useContext(ErrorContext)

  const commentField = useRef(null)

  const [mainPost, setMainPost] = useState(null)
  const [moreComment, setMoreComment] = useState(true)
  const [comment, setComment] = useState([])
  const [isAddProcess, setAddProcess] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      try {
        const postData = await getPostById(id)
        if (!postData) {
          return
        } else {
          setMainPost(postData)
        }
      } catch (e) {
        setNewErrorMsg('Failed to fetch post data')
        return
      }
    }

    const getComment = async () => {
      try {
        const commentData = await getCommentInPost(id)

        if (commentData.length !== 0) {
          setComment(commentData)
        }

        if (commentData.length < 10) {
          setMoreComment(false)
        }
      } catch (e) {
        setNewErrorMsg('Failed to fetch comment data')
      }
    }

    getPost()
    getComment()
  }, [history, id, setNewErrorMsg])

  const handleAddComment = async () => {
    try {
      if (!user) {
        setNewErrorMsg('Please login first')
        history.push(`/login`)
        return
      }
      const comment = commentField.current.value
      if (!comment.length) {
        setNewErrorMsg('Comment cannot be empty')
        return
      }
      await createCommentInPost(id, comment, user.uid, user.displayName)
      window.location.reload()
    } catch (e) {
      setAddProcess(false)
      setNewErrorMsg('Failed to create comment')
    }
  }

  if (!mainPost) {
    return <Loading />
  }

  return (
    <Box className={classes.rootBox}>
      <MainPost
        isLike={checkElementInsideArray(likePostId, id)}
        isFollow={checkElementInsideArray(followingList, mainPost.authorid)}
        postId={id}
        isLogin={!!user}
        data={mainPost}
      />
      <Divider />
      <Paper className={classes.makeCommentPaper}>
        <Avatar className={classes.avatarIcon} src={user?.profileUrl}>
          {user?.displayName[0].toUpperCase()}
        </Avatar>
        <TextFieldStyled
          className={classes.commentField}
          inputRef={commentField}
          placeholder="Add some comment?"
          variant="outlined"
        />
        <Button
          disabled={isAddProcess}
          className={classes.sendBtn}
          onClick={() => {
            setAddProcess(true)
            handleAddComment()
          }}
        >
          {'Send'}
        </Button>
      </Paper>
      <Divider />
      <Box width="100%">
        <InfiniteScroll
          endMessage={
            <Typography style={{ marginTop: '10px' }}>
              {'You have seen all comments!'}
            </Typography>
          }
          loader={<CircularProgress color="secondary" disableShrink />}
          dataLength={comment.length}
          className={`${classes.rootBox} ${classes.commentBox}`}
          hasMore={moreComment}
          next={async () => {
            try {
              const nextComment = await getCommentInPost(
                id,
                comment[comment.length - 1].index
              )
              if (nextComment.length < 10) {
                setMoreComment(false)
              }
              setComment([...comment, ...nextComment])
            } catch {
              setNewErrorMsg('Failed to fetch comment data')
            }
          }}
        >
          {comment.map((value, idx) => {
            return (
              <CommentBox
                isLogin={!!user}
                comment={value}
                index={idx}
                postId={id}
                isLike={checkElementInsideArray(likeCommentId, value.commentId)}
                commentId={value.commentId}
                key={value.commentId}
              />
            )
          })}
        </InfiniteScroll>
      </Box>
    </Box>
  )
}

export default PostViewer
