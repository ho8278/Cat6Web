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
                    로그아웃
                    <hr />
                    <p className="groups_bar">Groups</p>
                    <NavLink to="/">group1</NavLink>
                    <NavLink to="/">group2</NavLink>
                    <NavLink to="/">group3</NavLink>
                </div>
            </div>
            <hr />
        </div>
       
    );
};

export default Header

  /* 안쓰는거 
  <div className="my_page_nav">
               <input className="hamburger" type="checkbox" />
               <label for="hamburger">&equiv;</label>
               <nav>
                  <header>메뉴</header>
                    <ul>
                      <li><a href="#">한놈</a></li>
                     <li><a href="#">두시기</a></li>
                      <li><a href="#">석삼</a></li>
                    </ul>
               </nav>
               <div className="content">
                    <h1>CSS 슬라이드 메뉴 예제</h1>
                    <p>몰라ㅏ아</p>
                </div>
            </div> */

            /* <NavLink to="/myPage"><div style={mypage}>my page</div></NavLink> */
            
            /* <select className="mypage_dropdown">
              <option className="user_info_change">회원정보 수정</option>
              <option className="user_signout">회원탈퇴</option>
              <hr />
              <option className="groups_list">group1</option>
            </select> */