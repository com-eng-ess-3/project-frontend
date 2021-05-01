import { Box, Typography, makeStyles, Button, Paper, Divider } from '@material-ui/core'
import React, { useState, useContext,  } from 'react'
//import { useParams } from 'react-router'
import { UserContext } from 'context/userContext'
import { CardPost, NavBar } from 'components'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import { AccountCircleOutlined } from '@material-ui/icons'
import { useHistory } from 'react-router'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ProfileBox from 'components/common/ProfileBox'
import Avatar from '@material-ui/core/Avatar';
const useStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100%',
    flexFlow: 'column',
  },
  contentBox: {
    backgroundColor: theme.palette.background.black,
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
      width: '100%',
      maxWidth: '800px',
      marginLeft: '50px',
      marginBottom: '30px',
      marginRight: (props) => (props.isLogin ? '40%' : '50px'),
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
  ////////////
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
    //backgroundColor: grey[500],
    position: 'fixed',
    right: 0,
    padding: theme.spacing(1.25),
    maxHeight: '80%',
    width: '30%',
    marginTop: '90px',
    marginRight: theme.spacing(5),
  },
  // <Typography className={classes.checksize1}>(lg,xl]</Typography>
  //   <Typography className={classes.checksize2}>(md,lg]</Typography>
  //   <Typography className={classes.checksize3}>(sm,md]</Typography>
  //   <Typography className={classes.checksize4}>(xs,sm]</Typography>
  checksize1: {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  checksize2: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
    // [theme.breakpoints.up('lg')]: {
    //   display: 'none',
    // },
  },
  checksize3: {
    // [theme.breakpoints.down('sm')]: {
    //   display: 'none',
    // },
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
  
  unfollowbtn: {
    borderColor: '#f50057',
  },
  unfollowtext: {
    color: '#f50057',
  },


  followerBox: {
    marginTop: theme.spacing(1),
    width: '100%',
    backgroundColor: '#ffffff',
  },
  followedbtn: {
    borderColor: '#c8e6c9',
  },
  followedText: {
    color: '#c8e6c9',
  },

  followbtn: {
    borderColor: theme.palette.success.main,
  },
  followText: {
    color: theme.palette.success.main,
  },

  amountFollowingWerText: {
    color: theme.palette.background.dark,
    fontWeight: 'bold',
  }
}))

/////////////////////https://material-ui.com/components/lists//////////////////////
function ProfilePage() {
  const history = useHistory()
  //const id = useParams().id
  const userState = useContext(UserContext)
  const classes = useStyle({ isLogin: !!userState?.user })
  const [isMyProfile] = useState(true)
  const [selected, setSelected] = useState('Recent Post')

  return (
    // <React.Fragment>
    //   <Box>
    //     <Typography>{`Your query is ${id ? id : ''}`}</Typography>
    //   </Box>
    // </React.Fragment>
    <Box>
      <NavBar user={userState?.user}/>
      <Box className={classes.container}>
        <Box className={classes.contentBox}>
          
          <Box className={classes.allPostBox}>
            {/* <Box>
              <Typography>This is for notification Box</Typography>
              <Typography >test</Typography>
              <Typography className={classes.checksize1}>(lg,xl]</Typography>
              <Typography className={classes.checksize2}>down lg</Typography>
              <Typography className={classes.checksize3}>down md</Typography>
              <Typography className={classes.checksize4}>down sm</Typography>
              <ProfileBox></ProfileBox>
            </Box> */}
            <Box display={{ sm: 'block', md: 'none'}} className={classes.proFileTop}>
              <Box display='flex' justifyContent="center" width='100%'>
                <ProfileBox user={userState?.user}/>
              </Box>
              <Divider className={classes.dividerLine} />
            </Box>
            <Box width="100%" display="flex" justifyContent="center" marginBottom='20px'>
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
            {(selected === 'Recent Post' && isMyProfile) ?
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
            : null}
            {[0,1,2,3,4,5,6,7,8,9].map((value,idx) => {
                if (selected === 'Recent Post') {
                  return <CardPost user={userState?.user} />
                }
                return null
              })}
            {(selected === 'Following') ? 
              <Box width='100%' display='flex'>
                <Typography  className={classes.amountFollowingWerText}>230 Following</Typography>
              </Box>
            :null}
            {(selected === 'Following') ?
              <List dense className={classes.followingBox}>
              {[0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9].map((value) => {
                //const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem key={value} button>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${value + 1}`}
                        src={`https://picsum.photos/200`}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={`follwing ${value + 1}`} />
                    <ListItemSecondaryAction>
                      <Button variant="outlined" className={classes.unfollowbtn}>
                        <Typography className={classes.unfollowtext}>UNFOLLOW</Typography>
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
              </List>
            : null}
            {(selected === 'Followers') ? 
              <Box width='100%' display='flex'>
                <Typography  className={classes.amountFollowingWerText}>230 followers</Typography>
              </Box>
            :null}
            {(selected === 'Followers') ? 
              <List dense className={classes.followerBox}>
              {[0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9].map((value) => {
                //const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem key={value} button>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${value + 1}`}
                        src={`https://picsum.photos/200`}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={`follwing ${value + 1}`} />
                    {(value % 3 === 0) ? 
                      <ListItemSecondaryAction>
                        <Button variant="outlined"  className={classes.followedbtn}>
                          <Typography  className={classes.followedText}>followed</Typography>
                        </Button>
                     </ListItemSecondaryAction>
                    :
                      <ListItemSecondaryAction>
                        <Button variant="outlined" className={classes.followbtn}>
                          <Typography className={classes.followText}>+ follow</Typography>
                        </Button>
                    </ListItemSecondaryAction>
                    }
                  </ListItem>
                );
              })}
              </List>
            : null}
          </Box>
        </Box>
        <Box className={classes.proFileSide}>
          <ProfileBox user={userState?.user} ></ProfileBox>
        </Box>
      </Box>
    </Box>
  )
}
export default ProfilePage