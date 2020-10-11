import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import Map from './components/Map'
import AllProperties from './components/AllProperties'


class Routes extends Component {
  render() {
      return (
        <Switch>
          <Route exact path="/" component={Map} />
          <Route exact path="/properties/:id" component={AllProperties} />
        </Switch>
      )
  }
}
export default Routes

