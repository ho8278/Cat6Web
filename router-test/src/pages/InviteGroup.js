import React, {Component} from 'react';
import { NavLink, Route } from 'react-dom';
import './InviteGroup.css';
import Invite from './Invite';

class InviteGroup extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            client_id:'',
            data: [],
            result: null,
            searchDone: false,
            search_id : '',
            teams: [],
            selected_team_id:''
        };

        this.client_id = React.createRef();
        this.view_client_id = React.createRef();        
    }

    componentDidMount() {
        const id = window.sessionStorage.getItem('id');

        fetch("http://180.71.228.163:8080/viewTeams/n?client_ID="+id)
            .then(res => res.json())
            .then(
                (res) => {           
                    this.setState({
                        teams: res.data
                    })
                    console.log(this.state.teams)
                },
                (error) => {                    
                    alert(error);
                }
            )
    }

    findInviteGroup = (e) => {
        let id = this.client_id.current.value;
       
        fetch("http://180.71.228.163:8080/showClientInfo?client_ID=" + id)
            .then(res => res.json())
            .then(
                (res) => {
                    if(res.result == 200) 
                    {
                        this.setState({
                            searchDone: true,
                            data: res.data,
                            result: res.result,
                            search_id: res.data.client_ID
                        });
                    }
                    else {
                        alert('해당 아이디가 존재하지 않습니다');
                        this.client_id.current.value = '';
                        this.searchDone=false;
                        this.data = [];
                    }
                }                
            )
    }

    invite = (e) => {
        
        const id = this.client_id.current.value;
        const team_id = this.state.selected_team_id;

        fetch("http://180.71.228.163:8080/inviteTeam?client_ID=" + id + "&team_ID=" + team_id
        , {
            method: "POST"
        })
            .then(res => res.json())
            .then(
                (res) => {
                    console.log(res)
                    if(res == 200) 
                    {
                        alert('초대 완료!')
                    }
                    else {                        
                        alert('초대 실패')
                    }
                }                
            )
    }

    setSelectedID(id){
        this.setState({
            selected_team_id: id
        })
    }

    render() {
        let isLego = this.state.searchDone;
        let getID = this.state.data.client_ID;
        let getName = this.state.data.client_name;
        
        let t_list = this.state.teams;

        return (
            <div>
                <div className="dm_container">
                    <div className="dm_banner">Invite friends to your group</div>
  
                    <div className="check_group">                       
                           {t_list.map((name) =>{
                               return(<GroupInfo onSuccess={this.setSelectedID.bind(this)} name = {name.team_name} id = {name.team_ID}/>)
                           })}
                    </div>
                    
                    <div className="go">
                        <input ref={this.client_id} type="text" placeholder=" Find the ID of friend to invite"></input>
                        <button id="go_btn" onClick={this.findInviteGroup}>Find</button>
                    </div>

                    {isLego == true &&
                        
                        // this.view  
                        <div>
                        <div className="view_client_info">
                            <div>
                                <div id="vci">ID:<label>{getID}</label></div>
                                <div id="vci">Name:<label>{getName}</label></div>
                                <div id="vci">님을 초대할까요?</div>
                            </div>                           
                        </div>
                            <div className="go_invite">
                                <NavLink to='/'>
                                <button id="yes_btn" onClick={this.invite}>Yes</button>
                                </NavLink>
                            </div>
                        </div>
                        // <Invite client_id={this.client_id}/>
                        // <NavLink to="/invite">Invite</NavLink>
                                                        
                    }
                </div>
            </div>
        );
    }
};

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

export default InviteGroup;