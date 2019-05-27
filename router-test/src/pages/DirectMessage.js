import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

class DirectMessage extends Component {
    constructor(){
        super(...arguments)
        this.state = {
            data:[],
            isSearch: false,
            roomid :'',                  
        }
        this.input_id = React.createRef()
        this.find_client = this.find_client.bind(this)
    }

    find_client(){
        const c_id = this.input_id.current.value

        fetch("http://180.71.228.163:8080/showClientInfo?client_ID=" + c_id)
        .then(res => res.json())
        .then(
            (res) => {
                if(res.result == 200) 
                {
                    this.setState({
                        isSearch: true,
                        data: res.data
                    });

                    console.log(this.state.roomid);
                    let my_id = window.sessionStorage.getItem('id');
                 
                    console.log(c_id);
                    console.log(my_id);
                    var rroomid ='';

                    if(my_id>c_id)
                    {
                        rroomid = my_id+c_id;
                        console.log(rroomid)
                        this.setState({
                           roomid : rroomid
                        });
                        console.log('1');                
                    }
                    else
                    {
                        rroomid = c_id+my_id;
                        console.log(rroomid)
                        this.setState({
                            roomid: rroomid
                        });
                        console.log('2');
                    }

                    window.sessionStorage.setItem('tmp', this.state.roomid);
                    window.sessionStorage.setItem('ch_name', this.state.data.client_name)
                }
                else {
                    alert('해당 아이디가 존재하지 않습니다');
                    this.input_id.current.value = '';
                    this.isSearch=false;
                    this.data = [];
                }
            }                
        )
    }


    render() {
        let gogo = this.state.isSearch

        return (
            <div>
                <div className="dm_container">
                    <div className="dm_banner">Direct Massage</div>
                    <div className="go">
                        <input type="text" ref={this.input_id} placeholder="Find or start a conversation!"></input>
                        <button id="go_btn" onClick={this.find_client}>Go</button>
                    </div>

                    {gogo==true &&
                        <div>
                            <label>{this.state.data.client_name}님에게 메세지를 보내시겠습니까?</label>
                            <NavLink exact to="/myDirectmsg" ><button id="go_btn">DM!</button></NavLink>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default DirectMessage;