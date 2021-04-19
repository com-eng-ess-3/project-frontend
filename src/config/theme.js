import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createMuiTheme({
  breakpoints: {
    xs: 0,
    sm: 320,
    md: 480,
    lg: 768,
    xl: 1280,
  },
})

theme = responsiveFontSizes(theme)
export default theme
