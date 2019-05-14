/* <div className="groups_list_container">
  <div className="group_menu">
    <div className="group_name_container">
      <button className="goto_home">::before</button>
      <span id="group_name">Group1</span>
    </div>    
  </div>
  <div className="cpl_menu">
    
  </div>
</div> */

import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Groups_Nav extends Component {
    render() {
        return(
            <div>
              <div className="catSix_logo">cat6</div>
              <div className="groups_list_container">
                <nav>
                  <ul className="groups_list">
                    <li className="group_item">group1</li>
                    <li className="group_item">group2</li>
                    <li className="group_item">group3</li>
                    <li className="group_item">group4</li>
                  </ul>
                </nav>
              </div>
            </div>
        );
    }
}

export default Groups_Nav;