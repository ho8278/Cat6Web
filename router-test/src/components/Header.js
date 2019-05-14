import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const style ={
        // textAlign: 'left',
        paddingLeft: '20px',
        paddingRight: '20px',
        alignItem: 'center',
        backgroundColor: 'white',
        minHeight:'5vh',
        margin:0,
        flexDirection : 'row'
    };

    const logo = {
        textDecoration: 'none',
        color: 'darkblue',
        float: 'left',
        width: '90%'
    };

    const mypage = {
        textDecoration: 'none',
        color: 'darkblue',
        float: 'left',
        width: '10%',
        paddingTop: '20px',
        verticalAlign: 'middle',
        textAlign: 'center'
    };

    const clear ={
        clear: 'both'
    };

    return(
        <div style={style}>
            <NavLink to="/" style={logo}><h1>CatSix</h1></NavLink>

            {/* <div className="my_page_nav">
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
            </div> */}

            {/* <NavLink to="/myPage"><div style={mypage}>my page</div></NavLink> */}
            
            {/* <select className="mypage_dropdown">
              <option className="user_info_change">회원정보 수정</option>
              <option className="user_signout">회원탈퇴</option>
              <hr />
              <option className="groups_list">group1</option>
            </select> */}

            <div className="dropdown" style={mypage}>
                <button class="dropbtn">Mypage</button>
                <div class="dropdown-content">
                    <NavLink to="/mypage">회원정보 수정</NavLink>
                    <hr />
                    <p className="groups_bar">Groups</p>
                    <NavLink to="/">group1</NavLink>
                    <NavLink to="/">group2</NavLink>
                    <NavLink to="/">group3</NavLink>
                </div>
            </div>

            <div style={clear}></div>
            <hr />
        </div>
    );
};

export default Header