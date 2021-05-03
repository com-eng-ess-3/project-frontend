import {
  Box,
  Typography,
  makeStyles,
  Button,
  Divider,
  CircularProgress,
} from '@material-ui/core'
import { NavBar, CardPost } from 'components'

import { UserContext } from 'context/userContext'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getSearchResult, checkElementInsideArray } from 'utils/postUtil'

const useStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100%',
    flexFlow: 'column',
    width: '100%',
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
  searchResultPostBox: {
    maxWidth: '830px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  amountPostResult: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.background.dark,
    fontWeight: 'bold',
  },
  dividerLine: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

function SearchResult({ name }) {
  const { user, followingList, likePostId } = useContext(UserContext)
  const history = useHistory()
  const classes = useStyle()

  const [currentData, setCurrentData] = useState({
    'Sort by date': [],
    'Sort by like': [],
  })

  const [displayData, setDisplayData] = useState({
    'Sort by date': [],
    'Sort by like': [],
  })

  const [selected, setSelected] = useState('Sort by date')

  const tmp = []
  for (let i = 0; i < 10; i++) {
    tmp.push(i)
  }
  useEffect(() => {
    const getData = async () => {
      const queryData = await getSearchResult(name)

      const getByDate = [...queryData]
      getByDate.sort((a, b) => {
        return b.timeStamp.seconds - a.timeStamp.seconds
      })

      const getByLike = [...queryData]
      getByLike.sort((a, b) => {
        return b.like - a.like
      })

      setCurrentData({
        'Sort by date': getByDate,
        'Sort by like': getByLike,
      })

      setDisplayData({
        'Sort by date': getByDate.slice(0, 10),
        'Sort by like': getByLike.slice(0, 10),
      })
    }

    getData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])
  if (name === '') {
    history.push('/')
    return null
  }

  return (
    <Box justifyContent="center" display="flex">
      <NavBar />
      <Box className={classes.container}>
        <Box className={classes.contentBox}>
          <Box className={classes.allPostBox}>
            <Box className={classes.switchContainer}>
              {['Sort by date', 'Sort by like'].map((value) => {
                return (
                  <Button
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

            <Divider className={classes.dividerLine} />
            <Box className={classes.searchResultPostBox}>
              <Typography className={classes.amountPostResult}>
                {`${currentData[selected].length} Post${
                  currentData[selected].length > 1 ? 's' : ''
                } Result`}
              </Typography>

              <InfiniteScroll
                dataLength={currentData[selected].length}
                style={{
                  width: '90vw',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  overflowY: 'hidden',
                }}
                loader={<CircularProgress color="primary" disableShrink />}
                endMessage={
                  <Typography variant="h6">{'End of search result'}</Typography>
                }
                hasMore={
                  displayData[selected].length !== currentData[selected].length
                }
                next={() => {
                  const newLen = displayData[selected].length + 10
                  setDisplayData({
                    ...displayData,
                    [selected]: displayData[selected].slice(0, newLen),
                  })
                }}
              >
                {currentData[selected].map((value) => {
                  const isFollowing = checkElementInsideArray(
                    followingList,
                    value.authorid
                  )

                  const isLike = checkElementInsideArray(
                    likePostId,
                    value.postId
                  )
                  return (
                    <CardPost
                      user={user}
                      following={isFollowing}
                      isLike={isLike}
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
    </Box>
  )
}

export default SearchResult
