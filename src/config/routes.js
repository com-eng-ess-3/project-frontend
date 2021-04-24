import { Box, makeStyles } from '@material-ui/core'
import { LandingPage, LoginPage, NotFound } from 'pages'
import CreatePost from 'pages/createPost'
import EditPost from 'pages/editPost'
import RegisterPage from 'pages/register'
import SearchResult from 'pages/search'
import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100vh',
  },
}))

function PageRouting() {
  const query = new URLSearchParams(useLocation().search)
  const classes = useStyle()
  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Switch>
          <Route path="/create">
            <CreatePost />
          </Route>
          <Route path="/edit">
            <EditPost />
          </Route>
          <Route path="/search">
            <SearchResult name={query.get('name')} />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Box>
    </React.Fragment>
  )
}

export default PageRouting
