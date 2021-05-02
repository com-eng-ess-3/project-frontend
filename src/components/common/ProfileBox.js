import {
  Box,
  Paper,
  Card,
  Divider,
  makeStyles,
  Typography,
  InputBase,
} from '@material-ui/core'

import React, { memo, useState } from 'react'
import BuildIcon from '@material-ui/icons/Build'
import SaveIcon from '@material-ui/icons/Save'
import { storage } from 'utils/firebaseUtil'
import { Label } from '@material-ui/icons'
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
  },
  allInput: {
    width: '100%',
    color: theme.palette.secondary.main,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  profilePic: {
    width: '100%',
    display: 'block',
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
  const isLogin = false
  const isFollowed = false
  const classes = useStyle({ isLogin, isFollowed })
  const [isMyProfile] = useState(true)
  const [inNameEditState, setNameEditState] = useState(false)
  const [inStatusEditState, setStatusEditState] = useState(false)
  const [inInterestEditState, setInterestEditState] = useState(false)
  //const [wasFollow, setWasFollow] = useState(true)

  console.log('render ' + index)

  return (
    <Card className={classes.cardContainer}>
      <Box justifyContent="center" display="flex">
        <Typography variant="h5" className={classes.topicText}>
          {isMyProfile ? 'My Profile' : 'Profile'}
        </Typography>
      </Box>
      <Divider className={classes.dividerLine} />
      <Box
        display="flex"
        className={classes.picNameStaSide}
        marginBottom="15px"
      >
        <Box width="40%" className={classes.picBox}>
          <img
            className={classes.profilePic}
            src="https://picsum.photos/200"
            alt="display"
          />
          {isMyProfile ? (
            <BuildIcon className={classes.saveEditButtonPic}></BuildIcon>
          ) : null}
        </Box>
        <Box width="60%" marginLeft="15px">
          <Typography variant="h6" className={classes.topicText}>
            Name :
          </Typography>
          <Paper width="100%" className={classes.paper}>
            {inNameEditState ? (
              <InputBase
                className={classes.allInput}
                placeholder={user.displayName}
                //onChange={(e) => setNameEditState(false)}
              />
            ) : (
              <Typography variant="h6" className={classes.content}>
                {user.displayName}
              </Typography>
            )}
            {isMyProfile ? (
              <Box>
                {inNameEditState ? (
                  <SaveIcon
                    className={classes.saveEditButton}
                    onClick={() => setNameEditState(false)}
                  />
                ) : (
                  <BuildIcon
                    className={classes.saveEditButton}
                    onClick={() => setNameEditState(true)}
                  />
                )}
              </Box>
            ) : null}
          </Paper>
          <Typography variant="h6" className={classes.topicText}>
            Status :
          </Typography>
          <Paper width="100%" className={classes.paper}>
            {inStatusEditState ? (
              <InputBase
                className={classes.allInput}
                placeholder="single"
                //onChange={(e) => setStatusEditState(false)}
              />
            ) : (
              <Typography variant="h6" className={classes.content}>
                {user?.status}
              </Typography>
            )}
            {isMyProfile ? (
              <Box>
                {inStatusEditState ? (
                  <SaveIcon
                    className={classes.saveEditButton}
                    onClick={() => setStatusEditState(false)}
                  />
                ) : (
                  <BuildIcon
                    className={classes.saveEditButton}
                    onClick={() => setStatusEditState(true)}
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
          <img
            className={classes.profilePic}
            src="https://picsum.photos/200"
            alt="display"
          />
          {isMyProfile ? (
            <BuildIcon className={classes.saveEditButtonPic}></BuildIcon>
          ) : null}
        </Box>
        <Box width="60%" marginLeft="15px">
          {/* <Typography variant="h6" className={classes.topicText}>Name :</Typography>
                <Paper width='100%' className={classes.paper}>
                    <Typography variant="h6" className={classes.content}>{user.displayName}</Typography>
                </Paper>
                <Typography variant="h6" className={classes.topicText}>Status :</Typography>
                <Paper width='100%' className={classes.paper}>
                    <Typography variant="h6" className={classes.content}>single</Typography>
                </Paper> */}
          <Typography variant="h6" className={classes.topicText}>
            Name :
          </Typography>
          <Paper width="100%" className={classes.paper}>
            {inNameEditState ? (
              <InputBase
                className={classes.allInput}
                placeholder={user.displayName}
                //onChange={(e) => setNameEditState(false)}
              />
            ) : (
              <Typography variant="h6" className={classes.content}>
                {user.displayName}
              </Typography>
            )}
            {isMyProfile ? (
              <Box>
                {inNameEditState ? (
                  <SaveIcon
                    className={classes.saveEditButton}
                    onClick={() => setNameEditState(false)}
                  />
                ) : (
                  <BuildIcon
                    className={classes.saveEditButton}
                    onClick={() => setNameEditState(true)}
                  />
                )}
              </Box>
            ) : null}
          </Paper>
          <Typography variant="h6" className={classes.topicText}>
            Status :
          </Typography>
          <Paper width="100%" className={classes.paper}>
            {inStatusEditState ? (
              <InputBase
                className={classes.allInput}
                placeholder="single"
                //onChange={(e) => setStatusEditState(false)}
              />
            ) : (
              <Typography variant="h6" className={classes.content}>
                single
              </Typography>
            )}
            {isMyProfile ? (
              <Box>
                {inStatusEditState ? (
                  <SaveIcon
                    className={classes.saveEditButton}
                    onClick={() => setStatusEditState(false)}
                  />
                ) : (
                  <BuildIcon
                    className={classes.saveEditButton}
                    onClick={() => setStatusEditState(true)}
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
          <Box width="200px" className={classes.picBox}>
            <img
              className={classes.profilePic}
              src="https://picsum.photos/200"
              alt="display"
            />
            {isMyProfile ? (
              <Box htmlFor="file-input">
                <BuildIcon
                  htmlFor="file-input"
                  className={classes.saveEditButtonPic}
                >
                  <Label></Label>
                </BuildIcon>

                <input
                  style={{ display: 'none' }}
                  id="file-input"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const reader = new FileReader()
                      const file = e.target.files[0]

                      reader.addEventListener('load', () => {
                        storage.ref()
                      })

                      reader.readAsArrayBuffer(file)
                    }
                  }}
                  onClick={(e) => {
                    e.currentTarget.value = ''
                  }}
                  type="file"
                />
              </Box>
            ) : null}
          </Box>
        </Box>
        <Divider className={classes.dividerLine} />
        {/* <Typography variant="h6" className={classes.topicText}>Name :</Typography>
            <Paper width='100%' className={classes.paper}>
                <Typography variant="h6" className={classes.content}>{user.displayName}</Typography>
            </Paper>
            <Typography variant="h6" className={classes.topicText}>Status :</Typography>
            <Paper width='100%' className={classes.paper}>
                <Typography variant="h6" className={classes.content}>single</Typography>
            </Paper> */}
        <Typography variant="h6" className={classes.topicText}>
          Name :
        </Typography>
        <Paper width="100%" className={classes.paper}>
          {inNameEditState ? (
            <InputBase
              className={classes.allInput}
              placeholder={user.displayName}
              //onChange={(e) => setNameEditState(false)}
            />
          ) : (
            <Typography variant="h6" className={classes.content}>
              {user.displayName}
            </Typography>
          )}
          {isMyProfile ? (
            <Box>
              {inNameEditState ? (
                <SaveIcon
                  className={classes.saveEditButton}
                  onClick={() => setNameEditState(false)}
                />
              ) : (
                <BuildIcon
                  className={classes.saveEditButton}
                  onClick={() => setNameEditState(true)}
                />
              )}
            </Box>
          ) : null}
        </Paper>
        <Typography variant="h6" className={classes.topicText}>
          Status :
        </Typography>
        <Paper width="100%" className={classes.paper}>
          {inStatusEditState ? (
            <InputBase
              className={classes.allInput}
              placeholder="single"
              //onChange={(e) => setStatusEditState(false)}
            />
          ) : (
            <Typography variant="h6" className={classes.content}>
              single
            </Typography>
          )}
          {isMyProfile ? (
            <Box>
              {inStatusEditState ? (
                <SaveIcon
                  className={classes.saveEditButton}
                  onClick={() => setStatusEditState(false)}
                />
              ) : (
                <BuildIcon
                  className={classes.saveEditButton}
                  onClick={() => setStatusEditState(true)}
                />
              )}
            </Box>
          ) : null}
        </Paper>
      </Box>
      <Typography variant="h6" className={classes.topicText}>
        Follower : 25,435
      </Typography>
      <Typography variant="h6" className={classes.topicText}>
        Interested in :
      </Typography>
      <Paper width="100%" className={classes.interestPaper}>
        <Box width="100%">
          {inInterestEditState ? (
            <InputBase
              className={classes.allInput}
              placeholder="HEE !"
              width="100%"
              //onChange={(e) => setInterestEditState(false)}
            />
          ) : (
            <Typography variant="h6" className={classes.content}>
              HEE !
            </Typography>
          )}
        </Box>
        {isMyProfile ? (
          <Box marginTop="5px">
            {inInterestEditState ? (
              <SaveIcon
                className={classes.saveEditButton}
                onClick={() => setInterestEditState(false)}
              />
            ) : (
              <BuildIcon
                className={classes.saveEditButton}
                onClick={() => setInterestEditState(true)}
              />
            )}
          </Box>
        ) : null}
      </Paper>
    </Card>
  )
}

export default memo(ProfileBox)
