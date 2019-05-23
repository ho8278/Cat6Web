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
            cookie: this.props.cookie
        }
    }
    
    componentDidMount(){
        
        let id = window.sessionStorage.getItem('id');

        fetch("http://180.71.228.163:8080/viewTeams/n?client_ID="+id)        
          .then(res=>res.json())
          .then((res) => {
                // alert('success')
                // console.log(res.data);
          })
          .catch(function (error) {
            alert('error')
          });
    }
    // componentDidMount() {
    //     //소속 그룹 가져오기
    //     fetch("http://180.71.228.163:8080/viewTeams?clientID="+"sphong5911")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     data: result.data,
    //                     result: result.result
    //                 });
    //             },
    //             (error) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     error
    //                 });
    //             }
    //         )
    //         .then(function (response){
    //             console.log(response);
    //         })
    // }

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
                        <NavLink to="/mypage" cookie={this.state.cookie}>회원정보 수정</NavLink>
                        <button className="a" onClick={this.LogoutPopup}>로그아웃</button>
                        <hr />
    
                        <div className="group_invite">
                          <p className="groups_bar">Groups</p>                          
                          <NavLink to="/createGroup" className="add_btn">+</NavLink>
                        </div>
                        
                        {/* <section>
                            {data.team_name}
                        </section> */}
                        
                        <NavLink to="/">{this.props.cookie}</NavLink>
                        <NavLink to="/">group2</NavLink>
                        <NavLink to="/">group3</NavLink>    
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