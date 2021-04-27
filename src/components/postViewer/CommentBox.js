import {
  Avatar,
  Box,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons'
import React, { useState } from 'react'

const useStyle = makeStyles((theme) => ({
  rootPaper: {
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1.5),
    width: '60%',
    maxWidth: '900px',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  textLabel: {
    marginLeft: theme.spacing(0.75),
    fontWeight: 'bold',
  },
  hrDivider: {
    height: '2px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  commentContent: {
    color: theme.palette.text.secondary,
    lineHeight: '25px',
    textWeight: 'bold',
  },
}))

function CommentBox({ index }) {
  const classes = useStyle()
  const [isLiked, setLiked] = useState(false)
  return (
    <Paper className={classes.rootPaper}>
      <Typography
        style={{ textWeight: 'bold' }}
        variant="subtitle2"
      >{`Comment #${index + 1}`}</Typography>
      <Typography variant="body2" className={classes.commentContent}>
        {`โฟนรวมมิตรหลวงตา เซลส์แมนไทม์ฟิวเจอร์ ปิกอัพนอมินีการันตีเยอร์บีร่าพรีเซ็นเตอร์ โมหจริตโกะผลักดันคอนแทค ปาสเตอร์รีเสิร์ชล้มเหลวนาฏยศาลา กษัตริยาธิราช อึ้มเอ๋อ คาเฟ่ ภารตะคอมเมนท์โปรเจ็คไฮเอนด์ พาเหรดเป่ายิ้งฉุบไฮไลท์อยุติธรรม มะกันป๊อป เซ็กซ์ แชมเปี้ยนตุ๊กตุ๊กเวิลด์ แบตสมาพันธ์ วีซ่าวิลล์ โทรโข่งบอกซ์ซูมจิ๊กโซลาร์`}
      </Typography>
      <Divider className={classes.hrDivider} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Avatar src="https://youimg1.tripcdn.com/target/100i1f000001gp3y38C7A_C_750_500.jpg?proc=source%2Ftrip">
            A
          </Avatar>
          <Typography className={classes.textLabel} variant="subtitle1">
            {'Username'}
          </Typography>
          <Typography className={classes.textLabel} variant="subtitle2">
            {'Time'}
          </Typography>
        </Box>
        <Box display="flex">
          {!isLiked ? (
            <ThumbUpAltOutlined
              className={classes.clickableNode}
              onClick={() => setLiked(true)}
            />
          ) : (
            <ThumbUpAlt
              className={classes.clickableNode}
              onClick={() => setLiked(false)}
            />
          )}
          <Typography className={classes.textLabel}>{999}</Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default React.memo(CommentBox)
