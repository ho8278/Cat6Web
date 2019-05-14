import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Channels_Nav extends Component {
    render() {
        return(
            <div>
              <div className="channels_list_container">
                <nav>
                  <ul className="channels_list">
                    <li className="channel_item">channel1</li>
                    <li className="channel_item">channel2</li>
                    <li className="channel_item">channel3</li>
                    <li className="channel_item">channel4</li>
                  </ul>
                </nav>
              </div>
            </div>
        );
    }
}

export default Channels_Nav;