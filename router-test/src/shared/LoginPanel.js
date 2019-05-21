import React, { Component } from 'react';
import './LoginPanel.css'
import 'whatwg-fetch';
import CatSixLogo from 'img/CatSix.jpg';

class LoginPanel extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            requestID: '',
            requestPW: '',
            result: null
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

        let id = this.client_id.current.value;
        let pw = this.client_password.current.value;

        fetch("http://180.71.228.163:8080/login?client_ID="+id+"&client_password="+pw)
            .then(res => res.json())
            .then(
                (res) => {
                    // this.setState({
                    //     result:res.result
                    // })
                    if(res.result == 200) // 서버에서 반환값 제대로 오면 res.result로 비교
                    {
                        this.gotohome()
                    }
                    else {
                        this.client_id.current.value = ''
                        this.client_password.current.value = ''
                    }
                }
            )
    }

    gotohome() {
        let id = this.client_id.current.value;
        this.props.onSuccess(id);
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
                        <button onClick={this.tryLogin}>로그인</button>
                        <button type="register">회원가입</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPanel;