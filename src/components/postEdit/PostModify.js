import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core'
import { ChipTag, TextFieldStyled } from 'components'
import Loading from 'components/common/Loading'
import { UserContext } from 'context/userContext'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getColor } from 'utils/chipColorUtil'
import {
  createPost,
  deletePost,
  editPostById,
  getPostById,
} from 'utils/postUtil'

const useStyle = makeStyles((theme) => ({
  rootBox: {
    backgroundColor: theme.palette.background.default,
    paddingBottom: theme.spacing(3),
  },
  paperContainer: {
    marginTop: '100px',
    width: '60%',
    maxWidth: '800px',
    borderRadius: 5,
    padding: theme.spacing(3),
    paddingRight: theme.spacing(4),
    backgroundColor: theme.palette.common.white,
    border: `2px solid ${theme.palette.secondary.main}`,
  },
  textLabel: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
  addBtn: {
    border: `2px solid ${theme.palette.success.main}`,
    borderRadius: 8,
    boxSizing: 'border-box',
    color: theme.palette.success.main,
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.5),
    },
  },
  cancelBtn: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 8,
    boxSizing: 'border-box',
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
  },
  deleteBtn: {
    border: `2px solid ${theme.palette.error.main}`,
    borderRadius: 8,
    boxSizing: 'border-box',
    color: theme.palette.error.main,
    marginLeft: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    height: 2,
    color: theme.palette.divider,
  },
  boldTypo: {
    textTransform: 'none',
    fontWeight: 'bold',
  },
}))

const ContentText = withStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-input': {
      padding: theme.spacing(0),
      lineHeight: 1.5,
    },
  },
}))(TextFieldStyled)

function PostModify({ mode, id }) {
  const classes = useStyle()
  const history = useHistory()

  const [topicData, setTopicData] = useState('')
  const [contentData, setContentData] = useState('')
  const [isFinish, setFinish] = useState(false)
  const [tagLabel, setTagLabel] = useState('')

  const { user } = useContext(UserContext)

  const [chipData, setChipData] = useState([])

  const handleAddChip = (label) => {
    const newKey =
      chipData.length !== 0 ? chipData[chipData.length - 1].key + 1 : 0
    setChipData([
      ...chipData,
      {
        key: newKey,
        color: getColor(),
        label,
      },
    ])
  }

  const handleDeleteChip = (chipToDelete) => {
    setChipData((chip) => chip.filter((chip) => chip.key !== chipToDelete.key))
  }

  const handleEditPost = async () => {
    const topic = topicData
    const content = contentData
    const tag = chipData.map((value) => ({
      color: value.color,
      label: value.label,
    }))
    try {
      await editPostById(topic, content, tag, id)
      history.push(`/post/${id}`)
    } catch (e) {
      console.log(e.message)
      setFinish(true)
    }
  }

  const handleAddPost = async () => {
    const topic = topicData
    const content = contentData

    if (topic === '') {
      return
    }

    if (content === '') {
      return
    }

    const tag = chipData.map((value) => ({
      color: value.color,
      label: value.label,
    }))

    try {
      const id = await createPost(
        topic,
        content,
        tag,
        user.uid,
        user.displayName
      )

      history.push(`/post/${id}`)
    } catch (e) {
      console.log(e.message)
      setFinish(true)
    }
  }

  useEffect(() => {
    const getData = async () => {
      const postData = await getPostById(id)
      if (!postData) {
        history.push('/')
        return
      } else if (postData.authorid !== user.uid) {
        history.push('/')
        return
      }
      setTopicData(postData.topic)
      setContentData(postData.content)
      setChipData(postData.tag.map((value, idx) => ({ ...value, key: idx })))
      setFinish(true)
    }
    if (mode === 'Edit') {
      setFinish(false)
      getData()
    } else {
      setFinish(true)
    }
  }, [history, id, mode, user?.uid])

  if (!isFinish) {
    return <Loading />
  }

  return (
    <Box className={classes.rootBox} display="flex" justifyContent="center">
      <Box className={classes.paperContainer}>
        <Typography color="secondary" variant="h4">
          {mode === 'Edit' ? 'Edit your post' : 'Create new post'}
        </Typography>
        <Divider className={classes.divider} />
        <Box>
          <Box>
            <Typography className={classes.textLabel} variant="subtitle1">
              {'Topic Name:'}
            </Typography>
            <TextFieldStyled
              value={topicData}
              onChange={(e) => setTopicData(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box>
            <Box display="flex" alignItems="center" flexWrap="wrap">
              <Typography className={classes.textLabel} variant="subtitle1">
                {'Tag:'}
              </Typography>
              {chipData.map((value) => (
                <ChipTag
                  label={value.label}
                  key={value.key}
                  color="primary"
                  style={{ backgroundColor: value.color }}
                  onDelete={() => handleDeleteChip(value)}
                />
              ))}
            </Box>
            <Box display="flex" alignItems="center">
              <TextFieldStyled
                value={tagLabel}
                onChange={(e) => {
                  if (e.target.value.length <= 20) {
                    setTagLabel(e.target.value)
                  }
                }}
                variant="outlined"
              />
              <Button
                className={classes.addBtn}
                variant="outlined"
                onClick={() => {
                  if (tagLabel === '') {
                    return
                  }
                  handleAddChip(tagLabel)
                  setTagLabel('')
                }}
              >
                {'+ Add'}
              </Button>
            </Box>
          </Box>
          <Box width="100%">
            <Typography className={classes.textLabel}>{'Content:'}</Typography>
            <ContentText
              fullWidth
              variant="outlined"
              value={contentData}
              onChange={(e) => setContentData(e.target.value)}
              multiline
              rows={10}
              rowsMax={10}
            />
          </Box>
        </Box>
        <Divider className={classes.divider} />
        <Box display="flex" justifyContent="flex-end">
          <Button
            className={classes.cancelBtn}
            onClick={() => {
              history.push('/')
            }}
          >
            <Typography className={classes.boldTypo}>{'Cancel'}</Typography>
          </Button>
          {mode === 'Edit' ? (
            <Button
              className={`${classes.deleteBtn}`}
              onClick={async () => {
                try {
                  setFinish(false)
                  await deletePost(id)
                  history.push('/')
                } catch (e) {
                  setFinish(true)
                }
              }}
            >
              <Typography className={classes.boldTypo}>{'Delete'}</Typography>
            </Button>
          ) : null}
          <Button className={classes.addBtn}>
            <Typography
              className={classes.boldTypo}
              onClick={() => {
                setFinish(false)
                if (mode === 'Edit') {
                  handleEditPost()
                } else {
                  handleAddPost()
                }
              }}
            >
              {mode === 'Edit' ? 'Edit' : 'Create'}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PostModify
