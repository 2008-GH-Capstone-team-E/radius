import React from "react"
import {Link} from 'react-router-dom'


export const Header = () => {
  return (
    <div className='header'>
    <h1 className='headerText'>[logo] RADIUS</h1>
    <Link to="/login">LogIn</Link>
    <Link to="/signup">SignUp</Link>

    </div>
  )
}
