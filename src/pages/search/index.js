import { Box, Typography, makeStyles, Button, Divider } from '@material-ui/core'
import { NavBar,CardPost } from 'components'

import { UserContext } from 'context/userContext'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component'



const useStyle = makeStyles((theme) =>({

  container: {
    display: 'flex',
    height: '100%',
    flexFlow: 'column',
    width: '100%',
  },
  contentBox: {
    backgroundColor: theme.palette.background.default,
    flex: 1,
    display: 'flex',
    flexGrow: 'row',
    marginTop: '50px',
    justifyContent: 'center',
  },
  allPostBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    marginTop: '30px',
    width: '90%',
  },
  switchContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '800px',
    [theme.breakpoints.up('sm')]: {
      width: '90%',
    },
  },
  switchButton: {
    '&:hover': {
      backgroundColor: theme.palette.background.light,
    },
    padding: 10,
    borderRadius: 0,
    width: '100%',
    color: theme.palette.common.white,
    border: 'none',
    backgroundColor: theme.palette.background.light,
  },
  switchSelectedButton: {
    '&:hover': {
      backgroundColor: theme.palette.background.dark,
    },
    padding: 10,
    borderRadius: 0,
    width: '100%',
    color: theme.palette.common.white,
    border: 'none',
    backgroundColor: theme.palette.background.dark,
  },
  searchResultPostBox: {
    maxWidth: "830px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: "100%",
  },
  amountPostResult: {
    marginTop: theme.spacing(2),
    color: theme.palette.background.dark,
    fontWeight: 'bold',
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

  const [selected, setSelected] = useState('Sort by Date')

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
        <Box className={classes.contentBox}>
          <Box className={classes.allPostBox}>
            { /////////////////////////////////////////////switch เลือกระหว่าง Sort by Date ฿ Sort by Like}/////////////////////////////////
            }
            <Box className={classes.switchContainer}>
                {['Sort by Date', 'Sort by Like'].map((value) => {
                  return (
                    <Button
                      className={
                        selected === value
                          ? classes.switchSelectedButton
                          : classes.switchButton
                      }
                      variant="outlined"
                      onClick={() => setSelected(value)}
                    >
                      {value}
                    </Button>
                  )
                })}
            </Box>
            {/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            }


            <Divider className={classes.dividerLine} />
            <Box className={classes.searchResultPostBox}> 

              <Typography  className={classes.amountPostResult}>230 Posts Result</Typography> 


              {////////////////////////////////////////////////////////ที่ใส่ post result ถ้า useState == Sort by Date/////////////////////////
               }
               { (selected === 'Sort by Date') ?
                <InfiniteScroll
                  dataLength={arr.length}
                  style={{
                    width: '90vw',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
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
                    return <CardPost user={userState?.user}/>
                  })}
                </InfiniteScroll>
                :null}
              {/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              }



              {////////////////////////////////////////////////////////ที่ใส่ post result ถ้า useState == Sort by Date/////////////////////////
              }
              { (selected === 'Sort by Like') ?
                <InfiniteScroll
                  dataLength={arr.length}
                  style={{
                    width: '90vw',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
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
                    return <CardPost user={userState?.user}/>
                  })}
                </InfiniteScroll>
              :null}
              {/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              }




            </Box>
          </Box>
        </Box>        
      </Box>
    </Box>
  )
}

export default SearchResult
