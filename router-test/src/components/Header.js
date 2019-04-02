import React from 'react';
import { NavLink } from 'react-router-dom';

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
        lineHeight: '80px',
        verticalAlign: 'middle',
        textAlign: 'right'
    };

    const clear ={
        clear: 'both'
    };

    return(
        <div style={style}>
            <NavLink to="/" style={logo}><h1>CatSix</h1></NavLink>
            <NavLink to="/myPage"><div style={mypage}>my page</div></NavLink>
            <div style={clear}></div>
            <hr />
        </div>
    );
};

export default Header