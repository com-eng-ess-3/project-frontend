import {
  blue,
  brown,
  green,
  orange,
  pink,
  purple,
  red,
} from '@material-ui/core/colors'

const colorList = [
  blue[500],
  red[500],
  brown[500],
  purple[500],
  orange[700],
  pink[500],
  green[500],
]

export function getColor() {
  return colorList[Math.floor(Math.random() * colorList.length)]
}
