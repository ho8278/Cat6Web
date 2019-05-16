import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import './Mypage.css';

class Mypage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            result: null
        }
    }
    
    componentDidMount() {
        fetch("http://180.71.228.163:8080/showClientInfo?client_ID="+"a33a66a99")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result.data,
                        result: result.result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            .then(function (response){
                console.log(response);
            })
    }

    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div><h1>Error:</h1>{error.message}</div>;
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
                                        <input id="items" type="text" name="input_name" placeholder={data.client_name}></input>
                                    </div>

                                    <div className="user_info_text_item">
                                        <div><label>Nickname</label></div>
                                        <input id="items" type="text" name="input_nickname" placeholder={data.client_nickname}></input>
                                        <button className="check_overlap_btn">중복확인</button>
                                    </div>

                                    <div className="user_info_text_item">
                                        <div><label>Password</label></div>
                                        <input id="items" type="password" name="input_pw"></input>
                                        <div>
                                            <input id="items" type="password" name="check_input_pw"></input>
                                            <button className="check_pw_btn">비밀번호 확인</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="user_info_picture">
                                    <h3>사진</h3>
                                </div>
                            </div>

                            <div className="change_bt_body">
                                <button className="user_info_change_btn">Save changes!</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
};

export default Mypage;