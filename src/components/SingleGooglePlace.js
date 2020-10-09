import React from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchGooglePlace } from '../store/singleGooglePlace'
import '../css/style.css';


export class SingleGooglePlace extends React.Component {
  componentDidMount() {
    this.props.getSinglePlace()
  }

  render() {
    console.log("this.props", this.props)
    //const {products} = this.props
    return (
      <div>
        <h2>This is inside Single Google COmponent</h2>
      </div>
    )
  }
}

const mapState = state => {
  console.log("this is state from SGP",state)
  return {
    singlePlace: state.singlePlace
  }
}

const mapDispatch = dispatch => {
  return {
    getSinglePlace: () => {
      dispatch(fetchGooglePlace())
    }
  }
}
//export default connect(mapState, mapDispatch)(SingleGooglePlace)

SingleGooglePlace = withRouter(connect(mapState)(SingleGooglePlace))

export default SingleGooglePlace
