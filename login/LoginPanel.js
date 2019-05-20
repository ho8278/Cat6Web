import React, { Component} from 'react';
import './LoginPanel.css'
import 'whatwg-fetch';
import CatSixLogo from 'img/CatSix.jpg';

class LoginPanel extends Component {


    constructor() {
        super(...arguments);
        this.state = {
            requestID: '',
            requestPW: '',
        };

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        let userInfo = {
            'user_id': this.state.requestID,
            'user_pw': this.state.requestPW
        };
        //테스트를 위한 임시 정보
        let tmpId = "cat6"
        let tmpPw = "1q2w3e"

        if (this.state.requestID == tmpId && this.state.requestPW == tmpPw) {
            this.props.onSuccess(this.state.requestID);
        }
        else {
            //오류 팝업 발생   
            this.setState({
                requestID: '',
                requestPW: ''
            });
        }
    }

    render() {
        return (

            <div className = "loginPanel">
                <div className = "CatSixLogo">
                <img src={CatSixLogo} className="CatSixLogoStyle"/>
                </div>
                
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="requestID">ID</label>
                    <input
                        placeholder="id"
                        value={this.state.requestID}
                        onChange={this.handleChange}
                        name="requestID"
                    />

                    <label htmlFor="requestID">Password</label>
                    <input
                        placeholder="password"
                        type="password"
                        value={this.state.requestPW}
                        onChange={this.handleChange}
                        name="requestPW"
                    />
                    <div align = "center">
                    <button type="submit">로그인</button>
                    <button type="register">회원가입</button>
                    </div>
                </form>
                <h2>id : cat6 <br></br>pw : 1q2w3e</h2>
            </div>

        );
    }
}
export default LoginPanel;