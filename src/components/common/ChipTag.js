import { Chip, withStyles } from '@material-ui/core'

const ChipTag = withStyles((theme) => ({
  root: {
    borderRadius: 5,
    color: 'white',
    padding: 0,
    margin: theme.spacing(0.5),
    height: '25px',
  },
  label: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
}))(Chip)

export default ChipTag
