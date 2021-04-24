import {
  Box,
  Button,
  InputBase,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { AccountCircleOutlined } from '@material-ui/icons'
import { CardPost, NavBar } from 'components'
import { AuthContext } from 'context/userContext'
import React, { useContext, useEffect, useState } from 'react'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import InfiniteScroll from 'react-infinite-scroll-component'

const useStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100%',
    flexFlow: 'column',
  },
  contentBox: {
    backgroundColor: theme.palette.background.default,
    flex: 1,
    display: 'flex',
    flexGrow: 'row',
    marginTop: '50px',
    justifyContent: 'center',
  },
  allPostBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    width: '70%',
    maxWidth: '800px',
    marginTop: '30px',
    marginLeft: '50px',
    marginBottom: '30px',
    marginRight: '40%',
  },
  notificationBox: {
    overflow: 'auto',
    backgroundColor: grey[500],
    position: 'fixed',
    right: 0,
    padding: theme.spacing(1.25),
    maxHeight: '80%',
    width: '30%',
    marginTop: '90px',
    marginRight: theme.spacing(5),
  },
  switchButton: {
    '&:hover': {
      backgroundColor: theme.palette.background.light,
    },
    padding: 10,
    borderRadius: 0,
    width: '35%',
    color: theme.palette.common.white,
    border: 'none',
    backgroundColor: theme.palette.background.light,
  },
  switchSelectedButton: {
    '&:hover': {
      backgroundColor: theme.palette.background.dark,
    },
    padding: 10,
    borderRadius: 0,
    width: '35%',
    color: theme.palette.common.white,
    border: 'none',
    backgroundColor: theme.palette.background.dark,
  },
  newPostContainer: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 5,
    border: `1px solid ${theme.palette.background.dark}`,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  createPostBtn: {
    textTransform: 'none',
    borderColor: theme.palette.success.main,
    borderRadius: 10,
  },
  createIcon: {
    color: theme.palette.success.main,
    marginRight: theme.spacing(0.5),
  },
  createText: {
    color: theme.palette.success.main,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
    },
  },
  description: {
    color: theme.palette.secondary.main,
    paddingLeft: theme.spacing(1),
    fontWeight: 'bold',
    paddingRight: theme.spacing(1),
  },
  searchPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
  },
}))

function LandingPage() {
  const classes = useStyle()
  const [selected, setSelected] = useState(0)
  const [arr, setArr] = useState([])

  const userState = useContext(AuthContext)
  const tmp = []
  for (let i = 0; i < 10; i++) {
    tmp.push(i)
  }

  useEffect(() => {
    setArr(tmp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      <NavBar user={userState?.user} />
      <Box className={classes.container}>
        <Box className={classes.contentBox}>
          <Box className={classes.allPostBox}>
            <Box width="100%" display="flex" justifyContent="center">
              {['Popular', 'Newest', 'Following'].map((value, idx) => (
                <Button
                  key={idx}
                  className={
                    selected === idx
                      ? classes.switchSelectedButton
                      : classes.switchButton
                  }
                  variant="outlined"
                  onClick={() => setSelected(idx)}
                >
                  {value}
                </Button>
              ))}
            </Box>
            <Paper className={classes.newPostContainer}>
              <AccountCircleOutlined fontSize="large" color="primary" />
              <Paper className={classes.searchPaper} component="form">
                <Typography className={classes.description}>
                  {'What’s on your mind ?'}
                </Typography>
              </Paper>
              <Button className={classes.createPostBtn} variant="outlined">
                <CreateRoundedIcon className={classes.createIcon} />
                <Typography className={classes.createText}>
                  {'Create Post'}
                </Typography>
              </Button>
            </Paper>
            <InfiniteScroll
              dataLength={arr.length}
              style={{ width: '100%' }}
              hasMore={true}
              next={() => {
                console.log(arr.length)
                const tmp2 = []
                for (let i = 0; i < 10; i++) {
                  tmp2.push(i)
                }
                setArr([...arr, ...tmp2])
              }}
            >
              {arr.map((_value, idx) => {
                return <CardPost user={userState?.user} index={idx} key={idx} />
              })}
            </InfiniteScroll>
          </Box>
        </Box>
        <Box className={classes.notificationBox}>
          <Typography>This is for notification Box</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default React.memo(LandingPage)
