import React from 'react';
import './Mypage.css';

const Mypage = () => {
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
                                <input type="text" name="input_name"></input>
                            </div>

                            <div className="user_info_text_item">
                                <div><label>Nickname</label></div>
                                <input type="text" name="input_nickname"></input>
                                <button className="check_overlap_btn">중복확인</button>
                            </div>

                            <div className="user_info_text_item">
                                <div><label>Password</label></div>
                                <input type="password" name="input_pw"></input>
                                <input type="password" name="check_input_pw"></input>
                                <button className="check_pw_btn">비밀번호 확인</button>
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
};

export default Mypage;