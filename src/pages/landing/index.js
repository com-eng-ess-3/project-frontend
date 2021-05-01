import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core'
import { AccountCircleOutlined } from '@material-ui/icons'
import { CardPost, NavBar } from 'components'
import { UserContext } from 'context/userContext'
import React, { useContext, useEffect, useState } from 'react'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useHistory } from 'react-router'
import {
  checkElementInsideArray,
  getNewestPost,
  getPopularPost,
} from 'utils/postUtil'

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
    marginTop: '30px',
    width: '90%',
  },
  switchContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '800px',
    [theme.breakpoints.up('sm')]: {
      width: '90%',
    },
  },
  switchButton: {
    '&:hover': {
      backgroundColor: theme.palette.background.light,
    },
    padding: 10,
    borderRadius: 0,
    width: '100%',
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
    width: '100%',
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
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem',
    },
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
  const history = useHistory()

  const [selected, setSelected] = useState('Popular')
  const [arr, setArr] = useState([])
  const [isMorePost, setMorePost] = useState({
    Popular: true,
    Newest: true,
    Following: true,
  })

  const [allPost, setAllPost] = useState({
    Popular: [],
    Newest: [],
    Following: [],
  })
  // const [popularPost, setPopularPost] = useState([])
  // const [newestPost, setNewestPost] = useState([])
  // const [followingPost, setFollowingPost] = useState([])

  const { user, likePostId } = useContext(UserContext)
  const classes = useStyle({ isLogin: !!user })

  useEffect(() => {
    const getData = async () => {
      const popularData = await getPopularPost()
      const newestData = await getNewestPost()

      setAllPost({ ...allPost, Popular: popularData, Newest: newestData })
      setMorePost({
        ...isMorePost,
        Popular: popularData.length === 10,
        Newest: newestData.length === 10,
      })
    }

    getData()

    const tmp = []
    for (let i = 0; i < 10; i++) {
      tmp.push(i)
    }
    setArr(tmp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      <NavBar isHomepage />
      <Box className={classes.container}>
        <Box className={classes.contentBox}>
          <Box className={classes.allPostBox}>
            <Box className={classes.switchContainer}>
              {['Popular', 'Newest', 'Following'].map((value, idx) => {
                if (value === 'Following' && !user) {
                  return null
                }
                return (
                  <Button
                    key={idx}
                    className={
                      selected === value
                        ? classes.switchSelectedButton
                        : classes.switchButton
                    }
                    variant="outlined"
                    onClick={() => setSelected(value)}
                  >
                    {value}
                  </Button>
                )
              })}
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
                <Typography
                  className={classes.createText}
                  onClick={() => history.push('/create')}
                >
                  {'Create Post'}
                </Typography>
              </Button>
            </Paper>
            <InfiniteScroll
              dataLength={allPost[selected].length}
              style={{
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
              endMessage={
                <Typography variant="h6">
                  {'You have seen posts all!'}
                </Typography>
              }
              hasMore={isMorePost[selected]}
              next={() => {
                console.log(arr.length)
                const tmp2 = []
                for (let i = 0; i < 10; i++) {
                  tmp2.push(i)
                }
                setArr([...arr, ...tmp2])
              }}
            >
              {allPost[selected].map((value) => {
                return (
                  <CardPost
                    user={!!user}
                    isLike={checkElementInsideArray(likePostId, value.postId)}
                    post={value}
                    id={value.postId}
                    key={value.postId}
                  />
                )
              })}
            </InfiniteScroll>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default React.memo(LandingPage)
