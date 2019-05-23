import React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Mypage.css';
import {Home} from 'pages';

class Mypage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            result: null,
            cookie: this.props.cookie,
            pwMod: false,
            chgPW: false
            // client_name:'',
            // client_nickname:'',
            // client_pw:''
        }

        this.changeInfo = this.changeInfo.bind(this)
        this.chgPWMod = this.chgPWMod.bind(this)
        this.checkPW = this.checkPW.bind(this)

        this.name = React.createRef();
        this.nickname = React.createRef();
        this.chgPW = React.createRef();
        this.pw = React.createRef();
        this.chkpw = React.createRef();
    }

    componentDidMount() {
        let id = window.sessionStorage.getItem('id');

        fetch("http://180.71.228.163:8080/showClientInfo?client_ID=" + id
            // , {
            //     credentials: "same-origin",
            //     headers: { 'set-Cookie': this.state.cookie }
            // }
        )
            .then(res => res.json())
            .then(
                (res) => {
                    this.setState({
                        isLoaded: true,
                        data: res.data,
                        result: res.result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    alert(error);
                }
            )
            .then(function (response) {
                console.log(response);
            })
    }

    changeInfo(e) {
        let id = window.sessionStorage.getItem('id');

        let name = this.name.current.value;
        let pw = this.pw.current.value;
        let nickname = this.nickname.current.value;

        if (name == ''){
            name = this.state.data.client_name
        }
        if (nickname == ''){
            nickname = this.state.data.client_nickname
        }

        if (this.state.pwMod == false) {
            if (pw == '') {
                alert("비밀번호를 입력해주세요.")
                e.preventDefault()
                return;
            }
            if (pw != this.state.data.client_password) {
                alert('비밀번호가 일치하지않습니다.')
                e.preventDefault()
                return;
            }
        }
        else {
            if (pw == '') {
                alert("비밀번호를 입력해주세요.")
                e.preventDefault()
                return;
            }
            if (this.state.chgPW == false) {
                alert("비밀번호 확인 버튼을 눌러주세요.")
                e.preventDefault()
                return;
            }
        }

        fetch("http://180.71.228.163:8080/updateClient/n?client_ID=" + id
            + "&client_password=" + pw
            + "&client_name=" + name
            + "&client_nickname=" + nickname
            + "&propfile_picture=" + ""
            , {
                method: "POST"
            })
            .then(res => res.json())
            .then(
                (res) => {
                    alert('회원정보수정 완료')
                },
                (error) => {
                    alert(error)
                    this.client_name.current.value = ''
                    this.client_nickname.current.value = ''
                    this.client_pw.current.value = ''
                }
            )
    }

    chgPWMod() {
        this.setState({
            pwMod: this.state.pwMod ? false : true
        })
    }

    checkPW() {
        let pw = this.pw.current.value;
        let chkpw = this.chkpw.current.value;

        if(pw == chkpw) {
            this.setState({
                chgPW: true
            })
            alert('비밀번호가 일치합니다.')
        }
        else {
            this.setState({
                chgPW: false
            })
            alert('비밀번호가 일치하지않습니다. 다시 입력해주세요')
            this.pw.current.value = '';
            this.chkpw.current.value = '';
        }
    }

    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div><h1>Error:</h1>{error.message} </div>;
        }
        else if (!isLoaded) {
            return (
                <div>
                    <div><h1>Loading...</h1></div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="husks">
                        <div className="mypage_container">
                            <div className="mypage_banner">
                                <p>Edit your profile!</p>
                                <hr />
                            </div>

                            <div className="user_info">
                                <div className="user_info_text">
                                    <div className="user_info_text_item">
                                        <div><label>Full name</label></div>
                                        <input id="items"
                                            type="text"
                                            ref={this.name}
                                            placeholder={data.client_name}
                                        />
                                    </div>

                                    <div className="user_info_text_item">
                                        <div><label>Nickname</label></div>
                                        <input id="items"
                                            type="text"
                                            ref={this.nickname}
                                            placeholder={data.client_nickname}
                                        />
                                        <button className="check_overlap_btn">중복확인</button>
                                    </div>
                                    <div className="user_info_text_item">
                                        <div><label>Password</label></div>
                                        <input id="items"
                                            type="password"
                                            ref={this.pw}
                                            placeholder="비밀번호 입력"
                                        />
                                    </div>

                                    {this.state.pwMod == true &&
                                        <div>
                                            <div className="user_info_text_item">
                                                <div>
                                                    <input id="items" 
                                                    type="password" 
                                                    name="check_input_pw"
                                                    ref={this.chkpw}
                                                    placeholder="비밀번호 재입력"
                                                    ></input>
                                                    <button className="check_pw_btn" onClick={this.checkPW}>비밀번호 확인</button>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <div className="user_info_text_item">
                                        <div>
                                            <input id="ext"
                                                type="checkbox"
                                                onClick={this.chgPWMod}
                                                checked={this.pwMod}
                                            />
                                            <label>비밀번호 변경</label>
                                        </div>
                                    </div>

                                </div>

                                <div className="user_info_picture">
                                    <h3>사진</h3>
                                </div>
                            </div>

                            <div className="change_bt_body">
                                <NavLink to="/"> 
                                <button className="user_info_change_btn" onClick={this.changeInfo}>Save changes!</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
};

export default Mypage;