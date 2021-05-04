import { ThemeProvider } from '@material-ui/core'
import theme from 'config/theme'
import { BrowserRouter as Router } from 'react-router-dom'
import PageRouting from 'config/routes'
import { UserProvider } from 'context/userContext'
import { ErrorProvider } from 'context/ErrorContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <ErrorProvider>
          <Router>
            <PageRouting />
          </Router>
        </ErrorProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
