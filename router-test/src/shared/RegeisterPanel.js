import React, { Component } from 'react';
import './RegisterPanel.css'
import 'whatwg-fetch';
import CatSixLogo from 'img/CatSix.jpg';

class RegisterPanel extends Component {


    constructor() {
        super(...arguments);
        this.state = {
            request_client_ID: '',
            request_client_password: '',
            request_client_name: '',
            request_client_nickname: '',
            request_profile_picture: ''
        };

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        let userInfo = {
            'client_ID': this.state.request_client_ID,
            'client_password': this.state.request_client_password,
            'client_name': this.state.request_client_name,
            'client_nickname': this.state.request_client_nickname,
            'profile_picture': this.state.request_client_picture
        };
        
        //ID
        //문자, 숫자만 사용가능
        let idRegex = /^[a-z0-9]+$/; 
        if (!idRegex.test(this.Client_ID)) {
            return({errType : "idTypeErr"})
        }
        //pw
        //8글자자 이상만 가능
        if (this.client_password.length < 8) {
            return({errType : "pwTypeErr"})
        }
        //name
        //한글만 가능
        let nameRegex = /^[가-힣]+$/;
        if (!nameRegex.test(this.client_name)) {
            return({errType : "nameTypeErr"})
        }
        //nickcname
        //10글자 이하만 가능
        if (this.client_nickname.length >= 10) {
            return({errType : "nicknameTypeErr"})
        }

        //모두 통과하면 DB와 통신...
    }

    render() {
        return (
            
            <div className="registerPanel">
                <div className="CatSixLogo">
                    <img src={CatSixLogo} className="CatSixLogoStyle" />
                </div>

                <form onSubmit={this.handleSubmit}>
                <fieldset>
                        <legend>회원가입</legend>
                        <table>
                            <tr>
                                <td>ID</td>
                                <td><input
                                    placeholder="id"
                                    value={this.state.requestID}
                                    onChange={this.handleChange}
                                    name="request_client_ID"
                                /></td>
                            </tr>
                            <tr>
                                <td>비밀번호</td>
                                <td><input
                                    placeholder="비밀번호"
                                    type="password"
                                    value={this.state.requestPW}
                                    onChange={this.handleChange}
                                    name="request_client_password"
                                /></td>
                            </tr>
                            <tr>
                                <td>비밀번호 확인</td>
                                <input
                                    placeholder="비밀번호 확인"
                                    type="password"
                                    name="check_password"
                                />
                            </tr>
                            <tr>
                                <td>이름</td>
                                <td><input
                                    placeholder="이름"
                                    value={this.state.requestPW}
                                    onChange={this.handleChange}
                                    name="request_client_name"
                                /></td>
                            </tr>

                            <tr>
                                <td>별명</td>
                                <td><input
                                    placeholder="password"
                                    type="password"
                                    value={this.state.requestPW}
                                    onChange={this.handleChange}
                                    name="request_client_nickname"
                                /></td>
                            </tr>
                        </table>
                        <div align = "right">
                        <button className="registerButton" type="submit">제출</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}
export default RegisterPanel;