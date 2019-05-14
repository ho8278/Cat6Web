// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import './Menu.css';

// const Menu = () => {
//     // NavLink -> 활성화된 URL의 스타일 혹은 클래스 지정가능
//     const activeStyle = { 
//         color: 'darkblue'
//     };

//     return (
//         <div>
//             <nav>
//                 <ul className="nav-container">
//                   <li className="nav-list"><NavLink exact to="/" activeStyle={activeStyle} className="nav-item">Calendar</NavLink></li>
//                   <li className="nav-list"><NavLink to="/conference" activeStyle={activeStyle} className="nav-item">Conference</NavLink></li>
//                   <li className="nav-list"><NavLink exact to="/channels" activeStyle={activeStyle} className="nav-item">Channels<button style={{border:'0', outline:'0'}}>+</button></NavLink></li>
//                   <li className="nav-list"><NavLink exact to="/direct" activeStyle={activeStyle} className="nav-item">Direct</NavLink></li>
//                   <li className="nav-list"><NavLink to="/posts" activeStyle={activeStyle} className="nav-item">Posts</NavLink></li>
//                 </ul>
//             </nav>
//         </div>
//     );
// };

// export default Menu;
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

class Menu extends Component {
  render() {
    const  listStyle ={
      listStyle: 'none'
    };
    const activeStyle = { 
      fontWeight: 'bold'
    };

    return(
      <div>
        <div className="group_name">group_name</div>
        <div className="menu_list_container">
          <nav>
            <ul className="menu_list" style={listStyle}>
              <li className="menu_item"><NavLink exact to="/" activeStyle={activeStyle} className="menu_link">Calendar</NavLink></li>
              <li className="menu_item"><NavLink exact to="/conference" activeStyle={activeStyle} className="menu_link">Conference</NavLink></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Menu;