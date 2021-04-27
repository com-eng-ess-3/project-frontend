import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core'
import { TextFieldStyled } from 'components'
import React, { useState } from 'react'
import { useHistory } from 'react-router'

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
  const [content, setContent] = useState('')

  return (
    <Box className={classes.rootBox} display="flex" justifyContent="center">
      <Box className={classes.paperContainer}>
        <Typography color="secondary" variant="h4">
          {mode === 'Edit' ? 'Edit your post' : 'Create new post'}
        </Typography>
        <Divider className={classes.divider} />
        <Box>
          <Box marginTop>
            <Typography className={classes.textLabel} variant="subtitle1">
              {'Topic Name:'}
            </Typography>
            <TextFieldStyled fullWidth variant="outlined" />
          </Box>
          <Box marginTop marginBottom>
            <Box>
              <Typography className={classes.textLabel} variant="subtitle1">
                {'Tag:'}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <TextFieldStyled variant="outlined" />
              <Button className={classes.addBtn} variant="outlined">
                {'+ Add'}
              </Button>
            </Box>
          </Box>
          <Box width="100%" marginBottom>
            <Typography className={classes.textLabel}>{'Content:'}</Typography>
            <ContentText
              fullWidth
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={10}
              rowsMax={10}
            />
          </Box>
        </Box>
        <Divider className={classes.divider} />
        <Box display="flex" justifyContent="flex-end" marginTop>
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
            onClick={() => console.log(content.split('\n'))}
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
