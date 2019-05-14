import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class DirectMessage_Nav extends Component {
    render() {
      const listStyle ={
        listStyle: 'none'
      };

      const dr={
        fontWeight: 'bold',
        fontSize: '20px',
        textDecoration: 'none'
      };
      
      return(
        <div>
          <div className="direct_container">
            <div><NavLink to="/direct" style={dr}>Direct Message</NavLink></div>
          </div>
        </div>
      );
    }
}

export default DirectMessage_Nav;