import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core'
import { blue, green, grey, red, yellow } from '@material-ui/core/colors'
import { ChipTag, TextFieldStyled } from 'components'
import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { getColor } from 'utils/chipColorUtil'

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
  const topicRef = useRef(null)
  const contentRef = useRef(null)
  const [tagLabel, setTagLabel] = useState('')

  const [chipData, setChipData] = useState([
    {
      key: 0,
      color: green[500],
      text: 'Hello',
    },
    {
      key: 1,
      color: yellow[900],
      text: 'Dev',
    },
    {
      key: 2,
      color: red[500],
      text: 'React',
    },
    {
      key: 3,
      color: grey[500],
      text: 'สวัสดีครับ',
    },
    {
      key: 4,
      color: blue[500],
      text: 'Hello',
    },
  ])

  const handleAddChip = (text) => {
    console.log(text)
    const newKey =
      chipData.length !== 0 ? chipData[chipData.length - 1].key + 1 : 0
    setChipData([
      ...chipData,
      {
        key: newKey,
        color: getColor(),
        text,
      },
    ])
  }

  const handleDeleteChip = (chipToDelete) => {
    setChipData((chip) => chip.filter((chip) => chip.key !== chipToDelete.key))
  }

  console.log(chipData)

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
            <TextFieldStyled inputRef={topicRef} fullWidth variant="outlined" />
          </Box>
          <Box>
            <Box display="flex" alignItems="center" flexWrap="wrap">
              <Typography className={classes.textLabel} variant="subtitle1">
                {'Tag:'}
              </Typography>
              {chipData.map((value) => (
                <ChipTag
                  label={value.text}
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
              inputRef={contentRef}
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
              if (mode === 'Edit') {
                history.push(`/post/${id}`)
              } else if (mode === 'Create') {
                history.push('/')
              }
            }}
          >
            <Typography className={classes.boldTypo}>{'Cancel'}</Typography>
          </Button>
          <Button
            className={classes.addBtn}
            onClick={() => console.log(contentRef.current.value.split('\n'))}
          >
            <Typography className={classes.boldTypo}>
              {mode === 'Edit' ? 'Edit' : 'Create'}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PostModify
