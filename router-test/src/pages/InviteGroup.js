import React from 'react';
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
            t_name: []
        };

        this.client_id = React.createRef();
        this.view_client_id = React.createRef();        
    }

    componentDidMount() {
        let id = window.sessionStorage.getItem('id');

        fetch("http://180.71.228.163:8080/viewTeams/n?client_ID="+id)
            //.then(res => res.json())
            .then(
                (res) => {
                    alert(res)
                    console.log(res.data)
                    this.setState({
                        teams: res.data
                        
                    });
                },
                (error) => {                    
                    alert(error);
                }
            )
            .then(function (response) {
                console.log(response);
            })
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
        
        let id = this.client_id.current.value;

        fetch("http://180.71.228.163:8070/inviteTeam?client_ID=" + id + "&team_ID="
        , {
            method: "POST"
        })
            .then(res => res.json())
            .then(
                (res) => {
                    console.log(res)
                    if(res.result == 200) 
                    {
                        alert('초대 완료!')
                    }
                    else {                        
                        alert('초대 실패')
                    }
                }                
            )
    }

    render() {
        let isLego = this.state.searchDone;
        let getID = this.state.data.client_ID;
        let getName = this.state.data.client_name;

        let t_list = this.state.t_name;

        return (
            <div>
                <div className="dm_container">
                    <div className="dm_banner">Invite friends to your group</div>
                    <div className="go">
                        <input ref={this.client_id} type="text" placeholder=" Find the ID of friend to invite"></input>
                        <button id="go_btn" onClick={this.findInviteGroup}>Find</button>
                    </div>

                    <div>
                        <li>{t_list}</li>
                    </div>
                    
                    {/* <label>{this.searchDone? this.search_id : '1234'}</label> */}
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
                                <button id="yes_btn" onClick={this.invite}>Yes</button>
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

export default InviteGroup;