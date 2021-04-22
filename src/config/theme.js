import { white } from '@material-ui/core/colors/common'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createMuiTheme({
  breakpoints: {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 1280,
    xl: 1920,
  },
  palette: {
    secondary: {
      main: '#0784B5',
    },
    background: {
      default: '#9BD4E4',
      dark: '#39ACE7',
    },
    success: {
      main: '#42B72A',
    },
    text: {
      primary: '#9BD4E4',
      secondary: white,
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'],
  },
})

theme = responsiveFontSizes(theme)
export default theme
