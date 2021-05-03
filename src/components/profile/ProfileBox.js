import {
  Box,
  Paper,
  Card,
  Divider,
  makeStyles,
  Typography,
  InputBase,
  Avatar,
} from '@material-ui/core'

import React, { memo, useCallback, useRef, useState } from 'react'
import BuildIcon from '@material-ui/icons/Build'
import SaveIcon from '@material-ui/icons/Save'
import { auth, storage } from 'utils/firebaseUtil'
import firebase from 'firebase'
import { updateProfileDetail } from 'utils/profileUtil'

const useStyle = makeStyles((theme) => ({
  cardContainer: {
    width: '92%',
    borderRadius: 5,
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(1.5),
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  authorBox: {
    display: 'flex',
    alignItems: 'center',
  },

  dividerLine: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },

  avatarImg: {
    color: theme.palette.common.black,
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
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem',
    },
    marginRight: theme.spacing(1),
    color: '#0784B5',
    fontWeight: 'bold',
  },
  supTopicText: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: '#0784B5',
  },
  paper: {
    borderRadius: 5,
    height: '32px',
    border: `1px solid ${theme.palette.background.dark}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem',
    },
    color: theme.palette.secondary.main,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    whiteSpace: 'pre-line',
  },
  picNameStaSide: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  picNameStaCenter: {
    marginBottom: '10px',
  },
  interestPaper: {
    borderRadius: 5,
    border: `1px solid ${theme.palette.background.dark}`,
    minHeight: '100px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  picNameStaSideLessThanSm: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  saveEditButton: {
    fontSize: 'small',
    marginRight: theme.spacing(1),
    color: theme.palette.secondary.main,
    cursor: 'pointer',
  },
  allInput: {
    width: '100%',
    color: theme.palette.secondary.main,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  profilePic: {
    width: '100%',
    height: '100%',
    display: 'block',
    border: 0,
    objectFit: 'cover',
  },
  saveEditButtonPic: {
    border: `1px solid ${theme.palette.background.dark}`,
    backgroundColor: '#ffffff',
    color: theme.palette.secondary.main,
    position: 'absolute',
    bottom: 5,
    right: 5,
    [theme.breakpoints.down('sm')]: {
      fontSize: 'small',
    },
  },
  picBox: {
    position: 'relative',
  },
}))

function ProfileBox({ user, index }) {
  const classes = useStyle()
  const [isMyProfile] = useState(auth.currentUser.uid === user.uid)
  const [inStatusEditState, setStatusEditState] = useState(false)
  const [inInterestEditState, setInterestEditState] = useState(false)

  const [prevStatusState, setPrevStatusState] = useState('')
  const [prevInterestState, setPrevInterestState] = useState('')

  const [statusValue, setStatusValue] = useState(user?.status)
  const [interestValue, setInterestValue] = useState(user?.interested)
  const imageInput = useRef(null)

  const handleStatusEdit = useCallback(async () => {
    try {
      if (prevStatusState === statusValue) {
        setStatusEditState(false)
        return
      }
      await updateProfileDetail(user.uid, 'status', statusValue)
    } catch {
      setStatusValue(prevStatusState)
    }
    setStatusEditState(false)
  }, [prevStatusState, statusValue, user.uid])

  const handleInterestedEdit = useCallback(async () => {
    try {
      if (prevInterestState === interestValue) {
        setInterestEditState(false)
        return
      }
      await updateProfileDetail(user.uid, 'interested', interestValue)
    } catch {
      setInterestValue(prevInterestState)
    }
    setInterestEditState(false)
  }, [interestValue, prevInterestState, user.uid])

  return (
    <Card className={classes.cardContainer}>
      <Box justifyContent="center" display="flex">
        <Typography variant="h5" className={classes.topicText}>
          {isMyProfile ? 'My Profile' : 'Profile'}
        </Typography>
      </Box>
      <Divider className={classes.dividerLine} />

      {
        /////////////////////////////////////////////case แรก size จอ > lg /////////////////////////////////////////////////////////////
      }
      <Box
        display="flex"
        className={classes.picNameStaSide}
        marginBottom="15px"
      >
        <Box
          width="40%"
          className={classes.picBox} /////// Box เก็บรูป/////////////////////////////////////
        >
          <Avatar
            className={classes.profilePic}
            src={user?.profileUrl}
            alt="display"
            variant="square"
          >
            {user?.displayName[0].toUpperCase()}
          </Avatar>
          {isMyProfile ? ( ///////////////////////////// ปุ่มแก้ รูป profile ///////////////////////////////////
            <BuildIcon
              className={classes.saveEditButtonPic}
              onClick={() => imageInput.current.click()}
            ></BuildIcon>
          ) : null}
        </Box>

        <Box width="60%" marginLeft="15px">
          <Typography variant="h6" className={classes.topicText}>
            Name :
          </Typography>
          <Paper width="100%" className={classes.paper}>
            <Typography variant="h6" className={classes.content}>
              {user?.displayName}
            </Typography>
          </Paper>
          <Typography variant="h6" className={classes.topicText}>
            Status :
          </Typography>
          <Paper width="100%" className={classes.paper}>
            {inStatusEditState ? (
              <InputBase
                className={classes.allInput}
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
              />
            ) : (
              <Typography variant="h6" noWrap className={classes.content}>
                {statusValue}
              </Typography>
            )}
            {isMyProfile ? (
              <Box>
                {inStatusEditState ? (
                  <SaveIcon
                    className={classes.saveEditButton}
                    onClick={() => handleStatusEdit()}
                  />
                ) : (
                  <BuildIcon
                    className={classes.saveEditButton}
                    onClick={() => {
                      setPrevStatusState(statusValue)
                      setStatusEditState(true)
                    }}
                  />
                )}
              </Box>
            ) : null}
          </Paper>
        </Box>
      </Box>

      <Box
        display="flex"
        className={classes.picNameStaSideLessThanSm}
        marginBottom="15px"
      >
        <Box width="40%" className={classes.picBox}>
          <Avatar
            className={classes.profilePic}
            src={user?.profileUrl}
            alt="display"
            variant="square"
          >
            {user?.displayName[0].toUpperCase()}
          </Avatar>
          {isMyProfile ? (
            <BuildIcon
              className={classes.saveEditButtonPic}
              onClick={() => imageInput.current.click()}
            ></BuildIcon>
          ) : null}
        </Box>
        <Box width="60%" marginLeft="15px">
          <Typography variant="h6" className={classes.topicText}>
            Name :
          </Typography>
          <Paper width="100%" className={classes.paper}>
            <Typography variant="h6" className={classes.content}>
              {user?.displayName}
            </Typography>
          </Paper>
          <Typography variant="h6" className={classes.topicText}>
            Status :
          </Typography>
          <Paper width="100%" className={classes.paper}>
            {inStatusEditState ? (
              <InputBase
                className={classes.allInput}
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
              />
            ) : (
              <Typography variant="h6" className={classes.content}>
                {statusValue}
              </Typography>
            )}
            {isMyProfile ? (
              <Box>
                {inStatusEditState ? (
                  <SaveIcon
                    className={classes.saveEditButton}
                    onClick={() => handleStatusEdit()}
                  />
                ) : (
                  <BuildIcon
                    className={classes.saveEditButton}
                    onClick={() => {
                      setPrevStatusState(statusValue)
                      setStatusEditState(true)
                    }}
                  />
                )}
              </Box>
            ) : null}
          </Paper>
        </Box>
      </Box>

      <Box
        className={classes.picNameStaCenter}
        display={{ xs: 'none', md: 'block', lg: 'none' }}
      >
        <Box justifyContent="center" display="flex">
          <Box width="200px" height="200px" className={classes.picBox}>
            <Avatar
              className={classes.profilePic}
              src={user?.profileUrl}
              alt="display"
              variant="square"
            >
              {user?.displayName[0].toUpperCase()}
            </Avatar>
            {isMyProfile ? (
              <Box>
                <BuildIcon
                  className={classes.saveEditButtonPic}
                  onClick={() => imageInput.current.click()}
                ></BuildIcon>
              </Box>
            ) : null}
          </Box>
        </Box>
        <Divider className={classes.dividerLine} />
        <Typography variant="h6" className={classes.topicText}>
          Name :
        </Typography>
        <Paper width="100%" className={classes.paper}>
          <Typography variant="h6" className={classes.content}>
            {user?.displayName}
          </Typography>
        </Paper>
        <Typography variant="h6" className={classes.topicText}>
          Status :
        </Typography>
        <Paper width="100%" className={classes.paper}>
          {inStatusEditState ? (
            <InputBase
              className={classes.allInput}
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value)}
            />
          ) : (
            <Typography variant="h6" className={classes.content}>
              {statusValue}
            </Typography>
          )}
          {isMyProfile ? (
            <Box>
              {inStatusEditState ? (
                <SaveIcon
                  className={classes.saveEditButton}
                  onClick={() => handleStatusEdit()}
                />
              ) : (
                <BuildIcon
                  className={classes.saveEditButton}
                  onClick={() => {
                    setPrevStatusState(statusValue)
                    setStatusEditState(true)
                  }}
                />
              )}
            </Box>
          ) : null}
        </Paper>
      </Box>

      <Typography variant="h6" className={classes.topicText}>
        Follower : {user?.followerCount}
      </Typography>
      <Typography variant="h6" className={classes.topicText}>
        Interested in :
      </Typography>
      <Paper width="100%" className={classes.interestPaper}>
        <Box width="100%">
          {inInterestEditState ? (
            <InputBase
              className={classes.allInput}
              value={interestValue}
              onChange={(e) => setInterestValue(e.target.value)}
              multiline={true}
              width="100%"
            />
          ) : (
            <Typography variant="h6" className={classes.content}>
              {interestValue}
            </Typography>
          )}
        </Box>
        {isMyProfile ? (
          <Box marginTop="5px">
            {inInterestEditState ? (
              <SaveIcon
                className={classes.saveEditButton}
                onClick={() => handleInterestedEdit()}
              />
            ) : (
              <BuildIcon
                className={classes.saveEditButton}
                onClick={() => {
                  setPrevInterestState(interestValue)
                  setInterestEditState(true)
                }}
              />
            )}
          </Box>
        ) : null}
      </Paper>
      <input
        style={{ display: 'none' }}
        id="file-input"
        accept="image/jpeg,image/png"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            const file = e.target.files[0]

            reader.addEventListener('load', () => {
              storage
                .ref()
                .child(`/users/${user.uid}/profileImage.png`)
                .put(reader.result)
                .on(firebase.storage.TaskEvent.STATE_CHANGED, {
                  complete: function () {
                    window.location.reload()
                  },
                })
            })

            reader.readAsArrayBuffer(file)
          }
        }}
        ref={imageInput}
        onClick={(e) => {
          e.currentTarget.value = ''
        }}
        type="file"
      />
    </Card>
  )
}

export default memo(ProfileBox)
