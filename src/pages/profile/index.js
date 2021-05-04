import {
  Box,
  Typography,
  makeStyles,
  Button,
  Paper,
  Divider,
  CircularProgress,
} from '@material-ui/core'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from 'context/userContext'
import { CardPost, NavBar } from 'components'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import { AccountCircleOutlined } from '@material-ui/icons'
import { useHistory, useParams } from 'react-router'
import List from '@material-ui/core/List'
import ProfileBox from 'components/profile/ProfileBox'
import { getUserProfile } from 'utils/profileUtil'
import Loading from 'components/common/Loading'
import { checkElementInsideArray, getFollowerPost } from 'utils/postUtil'
import InfiniteScroll from 'react-infinite-scroll-component'
import FollowingSlot from 'components/profile/FollowingSlot'
import FollowerSlot from 'components/profile/FollowerSlot'

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
    [theme.breakpoints.up('md')]: {
      width: '50%',
      maxWidth: '800px',
      marginLeft: '50px',
      marginBottom: '30px',
      marginRight: '40%',
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
  proFileSide: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    overflow: 'auto',
    position: 'fixed',
    right: 0,
    padding: theme.spacing(1.25),
    maxHeight: '80%',
    width: '30%',
    marginTop: '90px',
    marginRight: theme.spacing(5),
  },
  checksize1: {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  checksize2: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  checksize3: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  checksize4: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  proFileTop: {
    width: '100%',
  },
  dividerLine: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  followingBox: {
    marginTop: theme.spacing(1),
    width: '100%',
    backgroundColor: '#ffffff',
  },
  followerBox: {
    marginTop: theme.spacing(1),
    width: '100%',
    backgroundColor: '#ffffff',
  },

  amountFollowingWerText: {
    color: theme.palette.background.dark,
    fontWeight: 'bold',
  },
}))

function ProfilePage() {
  const history = useHistory()
  const uid = useParams().id
  const { user, likePostId, followingList } = useContext(UserContext)
  const classes = useStyle()

  /////////////////////////////////////////////////ตรงนี้ set ไว้เบี้ยงต้นว่าเรากำลังดู profile ตัวเองรึเปล่า/////////////////////////////////////////////
  const [isMyProfile, setMyProfile] = useState(false)
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [userProfile, setUserProfile] = useState(null)
  const [post, setPost] = useState([])
  const [followerData, setFollowerData] = useState({
    follower: [],
    following: [],
  })
  const [followingData, setFollowingData] = useState([])
  const [isMorePost, setMorePost] = useState(true)
  const [selected, setSelected] = useState('Recent Post')

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchData = await getUserProfile(uid, user?.uid === uid)
        const fetchPost = await getFollowerPost([uid])

        if (!fetchData.displayName) {
          history.push('/')
        }

        setUserProfile({
          uid,
          profileUrl: fetchData.profileUrl,
          displayName: fetchData.displayName,
          interested: fetchData.interested,
          status: fetchData.status,
          followerCount: fetchData.follower.length,
        })

        setFollowerData(fetchData.follower)
        setFollowingData(fetchData.following)

        if (fetchPost.length !== 10) {
          setMorePost(false)
        }

        setPost(fetchPost)
      } catch (e) {
        console.log(e.message)
        history.push('/')
      }
      setLoading(false)
    }

    getData()
    setLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  useEffect(() => {
    setMyProfile(user?.uid === uid)
    setSelected('Recent Post')
  }, [uid, user])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Box>
      <NavBar />
      <Box className={classes.container}>
        <Box className={classes.contentBox}>
          <Box className={classes.allPostBox}>
            <Box
              display={{ sm: 'block', md: 'none' }}
              className={classes.proFileTop}
            >
              <Box display="flex" justifyContent="center" width="100%">
                <ProfileBox
                  user={userProfile}
                  uid={user?.uid}
                  isMyProfile={isMyProfile}
                ></ProfileBox>
              </Box>
              <Divider className={classes.dividerLine} />
            </Box>

            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              marginBottom="20px"
            >
              {['Recent Post', 'Following', 'Followers'].map((value, idx) => {
                if (value === 'Following' && !isMyProfile) {
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

            {
              //////////////////////////////////////////////// (เมื่อเรากดเลือก recent post) ////////////////////////////////////////////////////////////
            }
            {
              selected === 'Recent Post' && isMyProfile ? ( ///////// ตรงนี้ดูว่าเราดู profile ตัวเองรำเปล่า ถ้าใช่ เราสามารถสร้าง post จากตรงนี้ได้/////////
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
              ) : null //////////////////////////////////// จบ create new post paper//////////////////////////////////////////////////////////////
            }
            {selected === 'Recent Post' ? (
              <Box width="100%">
                <InfiniteScroll
                  dataLength={post.length}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    overflowY: 'hidden',
                  }}
                  loader={<CircularProgress color="secondary" disableShrink />}
                  endMessage={
                    <Typography variant="h6">
                      {'You have seen all posts!'}
                    </Typography>
                  }
                  hasMore={isMorePost}
                  next={async () => {
                    let newData
                    const len = post.length

                    if (len > 0) {
                      newData = await getFollowerPost(
                        [uid],
                        post[len - 1].index
                      )
                    }

                    if (!newData || newData.length < 10) {
                      setMorePost(false)
                    }

                    if (!!newData) {
                      setPost([...post, ...newData])
                    }
                  }}
                >
                  {post.map((value) => {
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
            ) : null}

            {selected === 'Following' ? (
              <React.Fragment>
                <Box width="100%" display="flex">
                  <Typography className={classes.amountFollowingWerText}>
                    {followingData.length} Following
                  </Typography>
                </Box>
                <List dense className={classes.followingBox}>
                  {followingData.map((value) => {
                    return (
                      <FollowingSlot
                        key={value.uid}
                        value={value}
                        isLogin={!!user}
                        followingData={followingData}
                        setFollowingData={setFollowingData}
                      />
                    )
                  })}
                </List>
              </React.Fragment>
            ) : null}
            {selected === 'Followers' ? (
              <React.Fragment>
                <Box width="100%" display="flex">
                  <Typography className={classes.amountFollowingWerText}>
                    {followerData.length} Followers
                  </Typography>
                </Box>
                <List dense className={classes.followerBox}>
                  {followerData.map((value) => {
                    const isFollowing = checkElementInsideArray(
                      followingList,
                      value.uid
                    )
                    return (
                      <FollowerSlot
                        key={value.uid}
                        value={value}
                        isFollowing={isFollowing}
                        followingData={followingData}
                        setFollowingData={setFollowingData}
                        isLogin={!!user}
                      />
                    )
                  })}
                </List>
              </React.Fragment>
            ) : null}
          </Box>
        </Box>
        <Box className={classes.proFileSide}>
          <ProfileBox
            user={userProfile}
            uid={user?.uid}
            isMyProfile={isMyProfile}
          ></ProfileBox>
        </Box>
      </Box>
    </Box>
  )
}
export default ProfilePage
