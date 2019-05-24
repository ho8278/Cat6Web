import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './LeaveGroup.css';

class LeaveGroup extends Component{
    constructor() {
        super(...arguments);
        this.state = {
            teams: [],
            selected_team_id:''
        };   

        this.setSelectedID = this.setSelectedID.bind(this)
    }

    componentDidMount(){
        const id = window.sessionStorage.getItem('id');

        fetch("http://180.71.228.163:8080/viewTeams/n?client_ID="+id)
            .then(res => res.json())
            .then(
                (res) => {  
                    this.setState({
                        teams: res.data
                    })
                },
                (error) => {                    
                    alert(error);
                }
            )
    }

    leaveGroup=(e)=>{
        const id = window.sessionStorage.getItem('id');
        const team_id = this.state.selected_team_id;

        if(team_id == ''){
            alert('탈퇴할 그룹을 선택하세요')
            e.preventDefault()
            return;
        }

        fetch("http://180.71.228.163:8080/deleteClientFromTeam?client_ID=" + id + "&team_ID=" + team_id
        ,{
            method: "DELETE"
        })
            .then(res => res.json())
            .then(
                (res) => {  
                    if(res == 200){
                        alert('해당 그룹에서 탈퇴 완료')
                    }
                },
                (error) => {                    
                    alert(error);
                }
            )
    }

    setSelectedID(id){
        this.setState({
            selected_team_id: id
        })
    }

    render(){
        let t_list = this.state.teams;

        return (
            <div>
                <div className="leave_container">
                    <div className="leave_banner">Select group to leave</div>
                     
                    <div className="check_group">                       
                           {t_list.map((name) =>{
                               return(<GroupInfo onSuccess={this.setSelectedID.bind(this)} name = {name.team_name} id = {name.team_ID}/>)
                           })}
                    </div>
                    
                    정말 탈퇴하시겠습니까?
                    
                    <div className="leave">
                        <NavLink to='/'>
                            <button id="leave_btn" onClick={this.leaveGroup}>Leave</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

class GroupInfo extends Component{
    
    constructor() {
        super(...arguments);
        this.state = {
            id : this.props.id,
            name : this.props.name
        }
        this.clickedRadio = this.clickedRadio.bind(this)
    }

    clickedRadio(){
        this.props.onSuccess(this.state.id);
    }

    render(){
        return (
            <div>
            <label>
                <input type = "radio" name="group" onClick={this.clickedRadio}></input>{this.state.name}
            </label>
            </div>
        )
    }
}

export default LeaveGroup;