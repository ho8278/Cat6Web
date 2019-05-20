import React, { Component } from 'react';
import './CreateGroup.css';

class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            group_name: ''
        }
    }

    // shouldComponentUpdate(state) {
    //     fetch("http://180.71.228.163:8080/createTeam?team_name=zzz"
    //         , {method: "POST"}
    //         , {body: this.group_name}
    //     )
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({
    //                     isLoaded: true
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
    //             console.log('shouldComponentUpdate');
    //         })

    //     return true;
    // }

    handleChange = (e) => {
        this.setState({
            group_name: e.target.value
        })

        console.log(this.group_name);
    }

    createGroupClick = () => {
        fetch("http://180.71.228.163:8080/createTeam?team_name=" + this.group_name
            , { method: "POST" }
        )
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        .then(function (response) {
            console.log(response);
            console.log('shouldComponentUpdate');
        })
        const { group_name } = this.state;
        // this.setState({ isClicked: true });
        console.log({ group_name });
        alert('그룹이 생성되었습니다.');
        //window.location = '/';
    }

    render() {
        return (
            <div className="create_group_container">
                <div className="create_group_box">
                    <div className="create_group_banner">
                        <div>Create a group</div>
                    </div>

                    <div className="create_group_content">
                        <label id="items">Group name</label>
                        <input type="text" value={this.state.group_name} onChange={this.handleChange} />
                        <div>{this.state.group_name}</div>
                        <button id="create_group_btn" onClick={this.createGroupClick}> Go </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateGroup;