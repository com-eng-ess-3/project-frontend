import { Box, Typography, makeStyles, Card, Paper, InputBase, Button, Divider } from '@material-ui/core'
import { NavBar,CardPostSearchResult } from 'components'
import SearchIcon from '@material-ui/icons/Search'
import { UserContext } from 'context/userContext'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'


const useStyle = makeStyles((theme) =>({
  searchBoxContainer: {
  },
  // postResultContainer: {

  // },

  container: {// [theme.breakpoints.up('md')]: {
    //   marginmarginLeft: '15%',
    //   marginRight: '15%',
    // },
    height: "100%" ,
    width: "100%" ,
    marginTop: '70px' ,
    //backgroundColor: theme.palette.common.black,
    marginLeft: '17%',
    marginRight: '17%',
  },
  searchCard: {
    alignItems: 'center',
    borderRadius: 5,
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      width: '100%',
      maxWidth: '1000px',
    },
  },
  saerchBarAndButtonContainer: {
    justifyContent: 'space-between',
    display: 'flex',
  },selecSearchTypeContainer: {
    display: 'flex',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
  },
  postResultContainer: {
    //backgroundColor: theme.palette.common.white,
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      width: '100%',
      maxWidth: '1000px',
    },
  },
  dividerLine: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),  
  },
}))


function SearchResult({ name }) {
  const userState = useContext(UserContext)
  const history = useHistory()
  const classes = useStyle()
  const [arr, setArr] = useState([])

  const [selected, setSelected] = useState('byDate')

  const tmp = []
  for (let i = 0; i < 10; i++) {
    tmp.push(i)
  }
  useEffect(() => {
    setArr(tmp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (name === '') {
    history.push('/')
    return null
  }

  return (
    <Box  justifyContent="center" display='flex'>
      <NavBar user={userState?.user} />
      <Box className={classes.container} >
        <Card className={classes.searchCard}> 
          <Box className={classes.saerchBarAndButtonContainer} display='flex' justifyContent="center">
            <Box display='flex'>
              <SearchIcon style={{ fontSize: 30 }}/>
              <Paper
                className={classes.searchPaper}
                component="form"
              >
                <InputBase
                  className={classes.searchInput}
                  //onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="  Search"
                ></InputBase>
              </Paper>
            </Box>
            <Button className={classes.createPostBtn} variant="outlined" marginRight='20px'>
              <Typography
                className={classes.createText}
                //onClick={() => history.push('/create')}
              >
                {'Create Post'}
              </Typography>
            </Button>
          </Box>
          <Box className={classes.selecSearchTypeContainer}> 
            <Box display='flex' spacing='5px'>
              {(selected === 'byDate') ? 
                <RadioButtonCheckedIcon/> :
                <RadioButtonUncheckedIcon 
                  onClick={() => setSelected('byDate')}
                />
              }
              <Typography>sort by date</Typography>
            </Box>
            <Box display='flex' marginLeft='15px' spacing='5px'>
              {(selected === 'byMostView') ? 
                  <RadioButtonCheckedIcon/> :
                  <RadioButtonUncheckedIcon 
                    onClick={() => setSelected('byMostView')}
                  />
                }
              <Typography>sort by most view</Typography>
            </Box>
            <Box display='flex' marginLeft='15px' spacing='5px'>
              {(selected === 'byHotest') ? 
                  <RadioButtonCheckedIcon/> :
                  <RadioButtonUncheckedIcon 
                    onClick={() => setSelected('byHotest')}
                  />
                }
              <Typography>Hotest</Typography>
            </Box>
          </Box>
        </Card>
      <Box>
      <Divider className={classes.dividerLine} />
      {/* <Typography></Typography>
      <Box><Divider className={classes.dividerLine} /></Box> */}
    </Box>


<Box className={classes.postResultContainer}>
  <InfiniteScroll
    dataLength={arr.length}
    style={{ width: '100%' }}
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
      // return <CardPost user={userState?.user} index={idx} key={idx} />
      return <CardPostSearchResult user={userState?.user} index={idx} key={idx} />
    })}
  </InfiniteScroll>
</Box>


</Box>
</Box>
  )
}

export default SearchResult