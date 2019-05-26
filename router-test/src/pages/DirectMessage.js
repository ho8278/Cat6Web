import React, { Component } from 'react';

class DirectMessage extends Component {
    constructor(){
        super(...arguments)
        this.state = {
            data:[],
            isSearch: false
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

    go_dm(){
        alert('메시지창으로!')
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
                            <button id="go_btn" onClick={this.go_dm}>DM!</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default DirectMessage;