import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './Groups_Nav.css';

class Channels_Nav extends Component {
    render() {
      const listStyle ={
        listStyle: 'none'
      };

      const topic={
        fontWeight: 'bold',
        fontSize: '20px'
      };
      
      return(
        <div>
          <div className="channels_list_container">
            <div style={topic}>channels</div>
            <nav>
              <ul className="channels_list" style={listStyle}>
                <li className="channel_item">#channel1</li>
                <li className="channel_item">#channel2</li>
                <li className="channel_item">#channel3</li>
                <li className="channel_item">#channel4</li>
              </ul>
            </nav>
          </div>
        </div>
      );
    }
}

export default Channels_Nav;