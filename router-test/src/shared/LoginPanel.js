import React, { Component } from 'react';
import './LoginPanel.css'
import 'whatwg-fetch';
import CatSixLogo from 'img/CatSix.jpg';
import { withCookies, Cookies, ReactCookieProps, CookiesProvider, useCookies } from 'react-cookie';

class LoginPanel extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            requestID: '',
            requestPW: '',
            result: null,
            cookie: ''
        };

        this.client_id = React.createRef();
        this.client_password = React.createRef();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    tryLogin = (e) => {
        var myHeaders = new Headers();

        let id = this.client_id.current.value;
        let pw = this.client_password.current.value;

        fetch("http://180.71.228.163:8080/login?client_ID="+id+"&client_password="+pw
        // ,{
        //     headers: {
        //         "cookie": "JSESSIONID=D2C89674AC1A585C531FFEC59C104BBE"
        //       } 
        // }
        )
            .then(res=>res.json())
            .then(
                (res) => {   
                    console.log(res) 
                    this.setState({
                        cookie: res.cookie
                    })          
                    if(res.result == 200)
                    {
                        // alert(document.cookie)
                        this.gotohome();
                        console.log(res.headers); 
                        this.myHeaders = res.headers;
                        console.log(myHeaders);
                        // alert(myHeaders);
                    }
                    else {
                        this.client_id.current.value = ''
                        this.client_password.current.value = ''
                    }
                    //res.headers.get('Set_Cookie');
                    // setCookie(id, res.header.get(Set-Cookies))
                }                
            )
    }

    gotohome() {
        // let id = this.client_id.current.value; 
        // this.props.onSuccess(id);
        let cook = this.state.cookie;
        this.props.onSuccess(cook);
    }

    trySignup(){
        window.location.href='/signup';
    }

    render() {
        return (
            <div className="loginPanel">
                <div className="CatSixLogo">
                    <img src={CatSixLogo} className="CatSixLogoStyle" />
                </div>

                <div>
                    <label>ID</label>
                    <input
                        placeholder="id"
                        ref={this.client_id}
                        name="requestID"
                    />

                    <label>Password</label>
                    <input
                        placeholder="password"
                        type="password"
                        ref={this.client_password}
                        name="requestPW"
                    />
                    <div align="center">
                        <button id="btn" onClick={this.tryLogin}>로그인</button>
                        <button id="btn" onClick={this.trySignup}>회원가입</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPanel;