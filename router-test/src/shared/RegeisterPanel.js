import React, { Component } from 'react';
import './RegisterPanel.css'
import 'whatwg-fetch';
import CatSixLogo from 'img/CatSix.jpg';

class RegisterPanel extends Component {


    constructor() {
        super(...arguments);
        this.state = {
            // client_id: '',
            // client_password: '',
            // client_name: '',
            // client_nickname: '',
            // profile_picture: ''
        };

        this.client_id = React.createRef();
        this.client_password = React.createRef();
        this.client_name = React.createRef();
        this.client_nickname = React.createRef();
        this.profile_picture = React.createRef();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    signup = () => {
        let id = this.client_id.current.value;
        let pw = this.client_password.current.value;
        let name = this.client_name.current.value;
        let nickname = this.client_nickname.current.value;
        //let profile = this.profile_picture.current.value;
        let profile="";

        fetch("http://180.71.228.163:8080/createClient?client_ID="+id
            +"&client_password="+pw
            +"&client_name=" + name
            +"&client_nickname=" + nickname
            + "&profile_picture=" + profile
            , {method: "POST"})
            .then(res => res.json())
            .then(
                (res) => {
                    if(res==200) {                  
                        alert('회원가입 완료');      
                        window.location.replace('/');   
                    }
                    else {               
                        alert('회원가입 실패');      
                        window.location.replace('/');
                    }                
                },
                (error) => {
                }
            )  
    }
    // handleSubmit = (e) => {
    //     let userInfo = {
    //         'client_ID': this.state.request_client_ID,
    //         'client_password': this.state.request_client_password,
    //         'client_name': this.state.request_client_name,
    //         'client_nickname': this.state.request_client_nickname,
    //         'profile_picture': this.state.request_client_picture
    //     };
        
    //     //ID
    //     //문자, 숫자만 사용가능
    //     let idRegex = /^[a-z0-9]+$/; 
    //     if (!idRegex.test(this.Client_ID)) {
    //         return({errType : "idTypeErr"})
    //     }
    //     //pw
    //     //8글자자 이상만 가능
    //     if (this.client_password.length < 8) {
    //         return({errType : "pwTypeErr"})
    //     }
    //     //name
    //     //한글만 가능
    //     let nameRegex = /^[가-힣]+$/;
    //     if (!nameRegex.test(this.client_name)) {
    //         return({errType : "nameTypeErr"})
    //     }
    //     //nickcname
    //     //10글자 이하만 가능
    //     if (this.client_nickname.length >= 10) {
    //         return({errType : "nicknameTypeErr"})
    //     }

    //     //모두 통과하면 DB와 통신...
    // }

    render() {
        return (            
            <div className="registerPanel">
                <div className="CatSixLogo">
                    <img src={CatSixLogo} className="CatSixLogoStyle" />
                </div>
                
                <div>
                        <div id="title_text">회원가입 정보 기입</div>
                        <table className="content">
                            <tr>
                                <td>ID</td>
                                <td><input
                                    placeholder="id"                                    
                                    ref={this.client_id}
                                    // onChange={this.handleChange}
                                    name="request_client_ID"
                                /></td>
                            </tr>
                            <tr>
                                <td>비밀번호</td>
                                <td><input
                                    placeholder="비밀번호"
                                    type="password"
                                    //value={this.state.requestPW}                              
                                    ref={this.client_password}
                                    //onChange={this.handleChange}
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
                                    ref={this.client_name}
                                    //value={this.state.requestPW}
                                    //onChange={this.handleChange}
                                    name="request_client_name"
                                /></td>
                            </tr>

                            <tr>
                                <td>별명</td>
                                <td><input
                                    placeholder="password"                              
                                    ref={this.client_nickname}
                                    // value={this.state.requestPW}
                                    // onChange={this.handleChange}
                                    name="request_client_nickname"
                                /></td>
                            </tr>
                        </table>
                        <div>
                        <button id="signup_btn" onClick={this.signup}>제출</button>
                        </div>                        
                </div>
            </div>
        );
    }
}
export default RegisterPanel;