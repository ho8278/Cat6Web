import React, { Component } from 'react';
import axios from 'axios';
import './DropOut.css';

class DropOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isClicked: false
        }
    }

    // componentDidMount() {
    //     fetch("http://180.71.228.163:8080/deleteClient?client_ID=" + "Test1"
    //         , {method: "DELETE"})
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     isClicked:true
    //                 });
    //             },
    //             (error) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     error
    //                 });
    //             }
    //         )
    //         .then(function (response) {
    //             console.log(response);
    //         })
    // }

    dropOutClick = () => {
        const id = window.sessionStorage.getItem('id');

        fetch("http://180.71.228.163:8080/deleteClient/n?client_ID=" + id
            , {method: "DELETE"})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        isClicked:true
                    });
                    if (result == 200) {
                        alert('탈퇴가 완료되었습니다'); 
                        window.location='/';
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        const { isClicked } = this.state;
        // this.setState({ isClicked: true });
       
    }

    render() {
        return (
            <div>
                <div className="dropOut_container">
                    <div className="dropOut_banner">
                        <label>회원 탈퇴</label>
                    </div>

                    <div className="dropOut_content">
                        <div id="dropOut_notice">
                            <p>회원 탈퇴 시 모든 정보가 삭제되며, 이후 복구가 불가능합니다.</p>
                            {/* <p>{id}</p><p>님, 탈퇴하시겠습니까?</p> */}
                        </div>
                        <button id="dropOut_btn" onClick={this.dropOutClick}>탈퇴하기</button>
                    </div>
                </div>
            </div>
        )
    }
};

export default DropOut;