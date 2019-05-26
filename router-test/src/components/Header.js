import React, {Component} from 'react';
import { NavLink, Route } from 'react-router-dom';
import './Header.css';
import CatSixLogo from 'img/CatSix.jpg';
import MyPageLogo from 'img/MyPageLogo.jpg';
import axios from 'axios';

class Header extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            result: null,
            userId: '',
            cookie: this.props.cookie,
            teams: []
        }
    }

    LogoutPopup(){
        alert('로그아웃 되었습니다');
        window.location='/';
        // fetch("http://180.71.228.163:8080/logout")
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             alert(result);
        //             window.location='/';
        //         },
        //         (error) => {
        //         }
        //     )
    }
        
    render(){
        const { error, isLoaded, data } = this.state;
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
    
                        <div>
                          <p className="groups_bar">Group management</p>                          
                          <NavLink to="/createGroup">Create group</NavLink>                     
                          <NavLink to="/inviteGroup">Invite group</NavLink>                
                          <NavLink to="/leaveGroup">Leave group</NavLink>              
                          <NavLink to="/dropGroup">Delete group</NavLink>
                        </div>
                                                
                        {/* 이부분을 하지 말고 Calendar클릭 시 그룹을 드롭다운으로
                        보여주면서 해당 그룹의 일정으로 들어가게끔 만들자 */}
                        {/* <NavLink to="/">{this.props.cookie}</NavLink>
                        <NavLink to="/">group2</NavLink>
                        <NavLink to="/">group3</NavLink>     */}
                        <hr />
                        
                        <NavLink to="/dropOut">회원탈퇴</NavLink>
                    </div>
                </div>
                <hr />
            </div>
           
        );
    }
}

export default Header