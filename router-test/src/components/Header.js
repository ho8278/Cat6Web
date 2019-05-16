import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Popup } from 'react-popup';
import './Header.css';
import CatSixLogo from 'img/CatSix.jpg';
import MyPageLogo from 'img/MyPageLogo.jpg';

// class PopupZ extends Component {
//     render() {
//         return (
//             <div className='popup'>
//                 <div className='popup_inner'>
//                     <h3>{this.props.text}</h3>
//                     <input type="text" width="100px"></input>
//                     <div>
//                         <button onClick={this.props.closePopup}>Create</button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

class Header extends Component {
    // constructor(){
    //     super();
    //     this.state={showPopup:false};
    // }

    // togglePopup() {
    //     this.setState({
    //       showPopup: !this.state.showPopup
    //     });
    // }

    LogoutPopup(){
        alert('로그아웃 되었습니다!');
        window.location='/';
    }

    render(){
        return(
            <div className="head">
                <NavLink to="/" > 
                <img src={CatSixLogo} className="CatSixLogoStyle"/>
                </NavLink>
                <div className="dropdown" >
                <img src={MyPageLogo} className="MyPageLogoStyle"/>
                    <div className="dropdown-content">
                        <NavLink to="/mypage">회원정보 수정</NavLink>
                        <button className="a" onClick={this.LogoutPopup}>로그아웃</button>
                        <hr />
    
                        <div className="group_invite">
                          <p className="groups_bar">Groups</p>
                          <button className="add_btn" title="그룹 생성">+</button>
                          {/* <button className="add_btn" title="그룹 생성" onClick={this.togglePopup.bind(this)}>+</button>                          */}
                        </div>
                        {/* {this.state.showPopup ?
                            <PopupZ 
                                text="New group name:"
                            />
                            :null
                          } */}
                        <NavLink to="/">group1</NavLink>
                        <NavLink to="/">group2</NavLink>
                        <NavLink to="/">group3</NavLink>    
                        <hr />
                        
                        <button className="a">회원탈퇴</button>
                    </div>
                </div>
                <hr />
            </div>
           
        );
    }
}

export default Header