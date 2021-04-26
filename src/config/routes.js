import { Box, makeStyles } from '@material-ui/core'
import { LandingPage, LoginPage, NotFound } from 'pages'
import CreatePost from 'pages/createPost'
import EditPost from 'pages/editPost'
import ViewPostPage from 'pages/post'
import ProfilePage from 'pages/profile'
import RegisterPage from 'pages/register'
import SearchResult from 'pages/search'
import React from 'react'
import { Route, Switch, useLocation, Redirect } from 'react-router-dom'

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
          <Route exact path="/post/:id">
            <ViewPostPage />
          </Route>
          <Route exact path="/profile/:id">
            <ProfilePage />
          </Route>
          <Route exact path="/create">
            <CreatePost />
          </Route>
          <Route exact path="/edit">
            <Redirect to="/" />
          </Route>
          <Route exact path="/edit/:id">
            <EditPost />
          </Route>
          <Route exact path="/search">
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
