import { ThemeProvider } from '@material-ui/core'
import theme from 'config/theme'
import { BrowserRouter as Router } from 'react-router-dom'
import PageRouting from 'config/routes'
import { UserProvider } from 'context/userContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <PageRouting />
        </Router>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
