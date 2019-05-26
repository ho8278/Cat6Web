import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './Channels_Nav.css';

class Channels_Nav extends Component {
    render() {
      const listStyle ={
        listStyle: 'none'
      };
      
      const activeStyle= {
        fontWeight: 'bold',
        color: 'rgb(241, 210, 71)',
        fontSize: '30px'
      }
      return(
        <div>
          <div className="channels_list_container">
            <div className="channels_container">
            <NavLink to="/channels" activeStyle={activeStyle} className="channel_link"><label>Channels</label></NavLink>
              <button className="add_btn" title="채널 생성">+</button>
            </div>
            {/* <nav>
              <ul className="channels_list" style={listStyle}>
                <li className="channel_item"><NavLink to="/channels" activeStyle={activeStyle} className="channel_link">#Main-Channel</NavLink></li>
              </ul>
            </nav> */}
          </div>
        </div>
      );
    }
}

export default Channels_Nav;