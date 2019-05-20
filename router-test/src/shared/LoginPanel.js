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
            data: [],
            result: null
        };

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    tryLogin = (e) => {
        
        // let userInfo = {
        //     'user_id': this.state.requestID,
        //     'user_pw': this.state.requestPW
        // };
        
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

            <div className="loginPanel">
                <div className="CatSixLogo">
                    <img src={CatSixLogo} className="CatSixLogoStyle" />
                </div>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="requestID">ID</label>
                    <input
                        placeholder="id"
                        value={this.state.data.client_ID}
                        onChange={this.handleChange}
                        name="requestID"
                    />

                    <label htmlFor="requestID">Password</label>
                    <input
                        placeholder="password"
                        type="password"
                        value={this.state.data.client_password}
                        onChange={this.handleChange}
                        name="requestPW"
                    />
                    <div align="center">
                        <button onClick={this.tryLogin}>로그인</button>
                        <button type="register">회원가입</button>
                    </div>
                </form>
                {/* <h2>id : cat6 <br></br>pw : 1q2w3e</h2> */}
            </div>

        );
    }
}
export default LoginPanel;



// import React, { Component, PropTypes} from 'react';
// import { Router } from 'react-dom';
// import App from './App';
// import './LoginPanel.css'
// import 'whatwg-fetch';
// import CatSixLogo from 'img/CatSix.jpg';

// class LoginPanel extends Component {
//     constructor() {
//         super(...arguments);
//         this.state = {
//             isLoaded: false,
//             requestID: '',
//             requestPW: '',
//             data:[],
//             result: null
//         };

//     }

//     handleChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }

//     tryLogin = () => {
//         fetch("http://180.71.228.163:8080/login?client_ID="+ this.state.requestID +"&client_password="+ this.state.requestPW)
//             .then(res => res.json())
//             .then(
//                 (res) => {
//                     if(res.result == 200) {
//                         alert("정상적 로그인")
//                         this.props.onSuccess(this.state.requestID);
//                     }
//                     else{
//                         alert('아이디 또는 비밀번호가 틀렸습니다');
//                     }
//                 },
//                 (error) => {
//                     this.setState({
//                         isLoaded: true,
//                         // error
//                     });
//                 }
//             )
//             .then(function (response){
//                 console.log(response);
//             })
        
//     }

//     render() {
//         return (

//             <div className = "loginPanel">
//                 <div className = "CatSixLogo">
//                 <img src={CatSixLogo} className="CatSixLogoStyle"/>
//                 </div>
                
//                 <form onSubmit={this.handleSubmit}>
//                     <label htmlFor="requestID">ID</label>
//                     <input
//                         placeholder="id"
//                         value={this.state.data.client_ID}
//                         onChange={this.handleChange}
//                         name="requestID"
//                     />

//                     <label htmlFor="requestID">Password</label>
//                     <input
//                         placeholder="password"
//                         type="password"
//                         value={this.state.data.client_password}
//                         onChange={this.handleChange}
//                         name="requestPW"
//                     />
//                     <div align = "center">
//                     <button onClick={this.tryLogin}>로그인</button>
//                     <button type="register">회원가입</button>
//                     </div>
//                 </form>
//             </div>

//         );
//     }
// }

// // LoginPanel.propTypes={
// //     onSuccess: PropTypes.function
// // };

// export default LoginPanel;