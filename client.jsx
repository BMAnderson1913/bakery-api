import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CompaniesPage from './pages/Companies'
import PodcastsPage from './pages/Podcasts'

render(
  <BrowserRouter>
    <Switch>
      <Route path="/podcasts" component={PodcastsPage} />
      <Route path="*" component={CompaniesPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
)
