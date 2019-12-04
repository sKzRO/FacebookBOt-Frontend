import React, {Component} from 'react';
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'

class Navigation extends Component{

  render () {
    return (
     
      <nav className="light-blue lighten-1" role="navigation">
      <div className="nav-wrapper container"><a id="logo-container" href="localhost" className="brand-logo">ProductivityApp</a>
       
      </div>
    </nav> 
    )
  }
  
}

export default Navigation;
