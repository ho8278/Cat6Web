import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './CreateGroup.css';
import App from '../shared/App';

class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        }

        this.group_name = React.createRef();
    }
    
    createGroupClick = (e) => {
        const id = window.sessionStorage.getItem('id');
        let groupName = this.group_name.current.value;

        if(groupName == ''){
            alert('그룹 명을 적어주세요')
            e.preventDefault()
            return;
        }
       
        fetch("http://180.71.228.163:8080/createTeam/n?client_ID="+ id 
                +"&team_name=" + groupName
            , { method: "POST" }
        )
        .then(res => res.json())
        .then(
            (result) => {               
                                 
                    alert(groupName + ' 그룹이 생성되었습니다.')
                    // return <Route path='/home' component={App} />
                
            },
            (error) => {
                console.log('create group error')
            }
        )            
        alert(groupName + ' 그룹이 생성되었습니다.')
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
                        <NavLink to='/'>
                            <button id="create_group_btn" onClick={this.createGroupClick}>Go</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateGroup;