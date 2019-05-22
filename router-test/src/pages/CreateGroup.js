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

        this.group_name = React.createRef();
    }
    
    createGroupClick = () => {
        let groupName = this.group_name.current.value;
       
        fetch("http://180.71.228.163:8080/createTeam?team_name=" + groupName
            , { method: "POST" }
        )
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true
                });
                if(result.result == 200){                    
                    alert('그룹이 생성되었습니다.');
                }
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
        // const { group_name } = this.state;
        // this.setState({ isClicked: true });
        // console.log({ group_name });
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
                        <input type="text" ref={this.group_name} />
                        <div>{this.state.group_name}</div>
                        <button id="create_group_btn" onClick={this.createGroupClick}> Go </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateGroup;