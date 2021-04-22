const { withStyles, TextField } = require('@material-ui/core')

const TextFieldStyled = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid #9BD4E4',
      },
      '&:hover fieldset': {
        border: '2px solid #9BD4E4',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #9BD4E4',
      },
      margin: 5,
      fontWeight: 'bold',
      borderRadius: 8,
    },
    '& .MuiOutlinedInput-input': {
      padding: 10,
    },
  },
})(TextField)

export default TextFieldStyled
