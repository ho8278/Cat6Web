import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import CatSixLogo from 'img/CatSix.jpg';
import MyPageLogo from 'img/MyPageLogo.jpg';

const Header = () => {
    return(
        <div className="head">
            <NavLink to="/" > 
            <img src={CatSixLogo} className="CatSixLogoStyle"/>
            </NavLink>
            <div className="dropdown" >
            <img src={MyPageLogo} className="MyPageLogoStyle"/>
                <div class="dropdown-content">
                    <NavLink to="/mypage">회원정보 수정</NavLink>
                    <button className="a">로그아웃</button>
                    <hr />

                    <div className="group_invite">
                      <p className="groups_bar">Groups</p>
                      <button className="add_btn" title="그룹 생성">+</button>
                    </div>
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
};

export default Header