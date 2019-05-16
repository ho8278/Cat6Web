import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class DirectMessage_Nav extends Component {
    render() {
      const listStyle ={
        listStyle: 'none'
      };

      const dr={
        fontWeight: 'bold',
        fontSize: '30px',
        textDecoration: 'none',
        color: 'black'
      };
      
      const activeStyle={
        color: 'rgb(241, 210, 71)'
      };

      return(
        <div>
          <div className="direct_container">
            <div><NavLink to="/direct" style={dr} activeStyle={activeStyle}>Direct Message</NavLink></div>
          </div>
        </div>
      );
    }
}

export default DirectMessage_Nav;