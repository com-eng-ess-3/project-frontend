import { Box, Button, Divider, makeStyles, Paper } from '@material-ui/core'
import { blue, green, purple, red, yellow } from '@material-ui/core/colors'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { TextFieldStyled } from 'components'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CommentBox from './CommentBox'
import MainPost from './MainPost'

const useStyle = makeStyles((theme) => ({
  rootBox: {
    width: '100%',
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    paddingBottom: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '80px',
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(3),
      marginTop: '60px',
    },
  },
  commentBox: {
    marginTop: theme.spacing(0),
  },
  paperStyle: {
    width: '80%',
    marginTop: '10px',
    padding: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      width: '60%',
    },
  },
  makeCommentPaper: {
    width: '60%',
    maxWidth: '900px',
    marginTop: '10px',
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
      width: '90%',
      height: '30px',
    },
  },
  commentField: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  avatarIcon: {
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(1),
    },
  },
  sendBtn: {
    color: theme.palette.success.main,
    borderRadius: 10,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    border: `2px solid ${theme.palette.success.main}`,
    marginRight: theme.spacing(1),
  },

  clickableNode: {
    cursor: 'pointer',
  },
}))

function PostViewer({ user, id }) {
  const classes = useStyle()
  const [arr, setArr] = useState([])

  const topic = 'เนื้อเพลง โอมจงเงย - STAMP feat.Joey Boy , ตู่ ภพธร'
  const testStr = `โฟนรวมมิตรหลวงตา เซลส์แมนไทม์ฟิวเจอร์ ปิกอัพนอมินีการันตีเยอร์บีร่าพรีเซ็นเตอร์ โมหจริตโกะผลักดันคอนแทค ปาสเตอร์รีเสิร์ชล้มเหลวนาฏยศาลา กษัตริยาธิราช อึ้มเอ๋อ คาเฟ่ ภารตะคอมเมนท์โปรเจ็คไฮเอนด์ พาเหรดเป่ายิ้งฉุบไฮไลท์อยุติธรรม มะกันป๊อป เซ็กซ์ แชมเปี้ยนตุ๊กตุ๊กเวิลด์ แบตสมาพันธ์ วีซ่าวิลล์ โทรโข่งบอกซ์ซูมจิ๊กโซลาร์

  ซ้อรามเทพทับซ้อนสังโฆคีตราชัน หงวนโฮมมั้ยซาตานชินบัญชร เหมยฮาลาลวอล์ก โอเพ่น กัมมันตะดีลเลอร์อิเหนามาเฟียอึ๋ม ปิกอัพไลฟ์ตื้บ วาซาบิกุนซือเซ็กซ์จ๊อกกี้ ซีนสเตริโอ ตัวตน โอ้ยคาเฟ่วิดีโอฟลุตกรอบรูป ฟีดช็อปเปอร์เรซิน เจ๊าะแจ๊ะแคชเชียร์เท็กซ์ช็อต แคร์น็อกซากุระซัพพลายเออร์ โซนี่รีโมทวิดีโอ มั้ยเกสต์เฮาส์ กัมมันตะแจ๊กเก็ต
  
  พาร์หล่อฮังก้วยจีดีพียูโรเอ๋อ วาทกรรมแคร์ช็อต ศึกษาศาสตร์ซะเวณิกา แดนเซอร์ซัมเมอร์โลโก้ทัวริสต์น็อค ไรเฟิลฮิปโปโรแมนติก ไวอะกร้าเมจิค เกรย์แช่แข็งสเตชั่น โกะ เต๊ะแพทยสภาเอสเปรสโซพรีเซ็นเตอร์แคนู ติ๋มไตรมาส จิ๊กตุ๋ย แฟลชมอยส์เจอไรเซอร์อีสเตอร์มอคคา แทงโก้ไชน่าถ่ายทำแอนด์ โดนัทพาสตาผลักดันลาตินคาวบอย เทเลกราฟแดนเซอร์พอเพียงแคทวอล์ค โปรจตุคาม
  
  มยุราภิรมย์ โฟมคาปูชิโนการันตีคาราโอเกะ ม้าหินอ่อนเซี้ยว อุตสาหการห่วยซัพพลายเออร์ฮวงจุ้ย โรลออนแพลน โพสต์มินท์สเตชั่นมุมมอง แล็บ ทรู แกงค์โบ้ย แฟกซ์ดีลเลอร์มยุราภิรมย์ อันตรกิริยาตาปรือเคลื่อนย้ายคอนแทค เวอร์ รวมมิตรเอ็กซ์โปถ่ายทำโก๊ะโฟม พาสปอร์ตโบ้ยวืดคอรัปชัน เอ็นทรานซ์กาญจน์ออยล์สตริงจอหงวน ยนตรกรรมฮิปฮอปเซอร์
  
  อีสเตอร์ มอลล์แตงโมเฟอร์นิเจอร์ เมจิกอิสรชนหลวงพี่ อัลตรา สมาพันธ์คูลเลอร์ โปรเจกเตอร์อพาร์ตเมนต์บ็อกซ์ ฟาสต์ฟู้ดคอลเล็กชั่นฟาสต์ฟู้ดเมจิกเปปเปอร์มินต์ เจได เซอร์วิสออโต้เย้ว แคนยอนเที่ยงวันอพาร์ตเมนท์ ทัวร์ถ่ายทำ ไวกิ้ง สามช่าสถาปัตย์ เซฟตี้วิลเลจเนิร์สเซอรีสคริปต์ซิลเวอร์ ไฮไลท์กษัตริยาธิราช เบลอต่อยอดสไลด์ไมเกรน`
  const tag = [
    {
      color: green[500],
      text: 'Hello',
    },
    {
      color: yellow[900],
      text: 'Dev',
    },
    {
      color: red[500],
      text: 'React',
    },
    {
      color: purple[500],
      text: 'Frontend',
    },
    {
      color: blue[500],
      text: 'Hello',
    },
    {
      color: blue[500],
      text: 'Hello',
    },
    {
      color: blue[500],
      text: 'Hello',
    },
    {
      color: blue[500],
      text: 'Hello',
    },
    {
      color: blue[500],
      text: 'Hello',
    },
  ]
  useEffect(() => {
    const tmp = []
    for (let i = 0; i < 10; i++) {
      tmp.push(i)
    }
    setArr(tmp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box className={classes.rootBox}>
      <MainPost
        data={{
          topic: topic,
          content: testStr,
          tag,
          likeCount: 999,
          commentCount: 999,
          authorId: 'aaaa',
        }}
      />
      <Divider />
      <Paper className={classes.makeCommentPaper}>
        <AccountCircleIcon className={classes.avatarIcon} color="action" />
        <TextFieldStyled
          className={classes.commentField}
          placeholder="Add some comment ?"
          variant="outlined"
        />
        <Button className={classes.sendBtn}>{'Send'}</Button>
      </Paper>
      <Divider />
      <Box width="100%">
        <InfiniteScroll
          dataLength={arr.length}
          className={`${classes.rootBox} ${classes.commentBox}`}
          hasMore={true}
          next={() => {
            console.log(arr.length)
            const tmp2 = []
            for (let i = 0; i < 10; i++) {
              tmp2.push(i)
            }
            setArr([...arr, ...tmp2])
          }}
        >
          {arr.map((_value, idx) => {
            return <CommentBox index={idx} key={idx} />
          })}
        </InfiniteScroll>
      </Box>
    </Box>
  )
}

export default PostViewer
