import { Box, makeStyles, Typography } from '@material-ui/core'
import { green, grey } from '@material-ui/core/colors'
import { NavBar } from 'components'
import { AuthContext } from 'context/userContext'
import React, { useContext } from 'react'
import { auth } from 'utils/firebaseUtil'

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
  },
  allPostBox: {
    backgroundColor: grey[100],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    width: '70%',
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
    padding: '10px',
    maxHeight: '80%',
    width: '30%',
    marginTop: '30px',
    marginRight: '50px',
  },
}))

function LandingPage() {
  const classes = useStyle()
  const userState = useContext(AuthContext)
  let arr = []
  for (let i = 0; i < 1000; i++) {
    arr.push(i)
  }
  return (
    <Box>
      <NavBar user={userState?.user} />
      <Box className={classes.container}>
        <Box className={classes.contentBox}>
          <Box className={classes.allPostBox}>
            {arr.map((value) => (
              <Typography>{value}</Typography>
            ))}

            <Typography>
              {userState?.user?.uid ? userState.user.uid : 'Not login'}
            </Typography>
          </Box>
          <Box className={classes.notificationBox}>
            <Typography>This is for notification Box</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default LandingPage
