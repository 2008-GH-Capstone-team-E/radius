import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import AllProperties from './components/AllProperties'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Nearby from './components/Nearby'


class Routes extends Component {
  render() {
      return (
        <Switch>
          <Route exact path="/" component={Nearby} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={SignIn} />
          {/* <Route exact path="/properties/:id" component={SingleProperties} /> */}
        </Switch>
      )
  }
}
export default Routes