import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Nearby from './components/Nearby'
import SinglePropertyPage from './components/SinglePropertyPage'



class Routes extends Component {
  render() {
      return (
        <Switch>
          <Route exact path="/" component={Nearby} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/properties/:id" component={SinglePropertyPage} />
        </Switch>
      )
  }
}
export default Routes
