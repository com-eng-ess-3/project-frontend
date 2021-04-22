import './App.css'
import { ThemeProvider } from '@material-ui/core'
import theme from 'config/theme'
import { BrowserRouter as Router } from 'react-router-dom'
import PageRouting from 'config/routes'
import { AuthProvider } from 'context/userContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <PageRouting />
        </ThemeProvider>
      </Router>
    </AuthProvider>
  )
}

export default App
