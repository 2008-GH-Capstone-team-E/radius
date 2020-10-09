
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import AllProperties from './components/AllProperties'
import SingleProperty from './components/SingleProperty'
import AllGooglePlaces from './components/AllGooglePlaces'
import SingleGooglePlace from './components/SingleGooglePlace'

class Routes extends Component {

  componentDidMount() {}

  render() {
      return (
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/properties" component={AllProperties} />
          <Route exact path="/properties/:id" component={SingleProperty} />
          <Route path="/properties/:id/places" component={AllGooglePlaces} />
          <Route exact path="/properties/:id/places/:id" component={SingleGooglePlace} />
        </Switch>
      )
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

