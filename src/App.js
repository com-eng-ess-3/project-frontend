import './App.css'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { green, grey } from '@material-ui/core/colors'
import { NavBar } from './components'

const useStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    backgroundColor: grey[500],
    height: '100vh',
    flexFlow: 'column',
  },
  contentBox: {
    backgroundColor: green[500],
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

function App() {
  const classes = useStyle()
  return (
    <Box className={classes.container}>
      <NavBar />
      <Box className={classes.contentBox}>
        <Box className={classes.allPostBox}>
          <Typography>This is for display post</Typography>
        </Box>
        <Box className={classes.notificationBox}>
          <Typography>This is for notification Box</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default App
