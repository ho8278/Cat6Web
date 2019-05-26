import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './Posts.css'
import { Post } from 'pages'; 

// const Posts = ({match}) => {
//     return (
//         <div>
//            <h2>Post List</h2>  
//            <ul>
//                 <li><Link to={`${match.url}/1`}>Post #1</Link></li>
//                 <li><Link to={`${match.url}/2`}>Post #2</Link></li>
//                 <li><Link to={`${match.url}/3`}>Post #3</Link></li>
//                 <li><Link to={`${match.url}/4`}>Post #4</Link></li>
//            </ul>
//            <Route exact path={match.url} render={()=>(<h3>Please select any post</h3>)}/>
//            <Route path={`${match.url}/:id`} component={Post}/>
//         </div>
//     );
// };


class Posts extends Component {
    constructor(){
        super(...arguments)
        this.state={
            boards: [],
            teams: [],
            files: [],
            s_team_id: '',
            is_selected: false
        }
        this.setSelectedID = this.setSelectedID.bind(this)
        this.upload_file = this.upload_file.bind(this)
        this.up_file = React.createRef()
    }

    componentDidMount(){
        const id = window.sessionStorage.getItem('id');

        fetch("http://180.71.228.163:8080/viewTeams/n?client_ID="+id)
            .then(res => res.json())
            .then(
                (res) => {           
                    this.setState({
                        teams: res.data,
                        s_team_id: res.data[0].team_ID
                    })
                    console.log(this.state.teams)
                },
                (error) => {                    
                    alert(error);
                }
            )
    }

    setSelectedID(id){
        this.setState({
            s_team_id: id
        })

        console.log(this.state.s_team_id)

        fetch("http://180.71.228.163:8080/viewFiles?team_ID=" + id)
            .then(res => res.json())
            .then(
                (res) => {           
                    this.setState({
                        boards: res.data,
                        is_selected: true
                    })
                    console.log(this.state.boards)
                    console.log(this.state.is_selected)
                },
                (error) => {                    
                    alert(error);
                }
            )
    }

    upload_file(){
        console.log(this.state.s_team_id)
        let id = this.state.s_team_id;

        // const input = this.up_file.current.value;
        // console.log(input)
        var data = new FormData()
        // data.append('file', input.files[0])
        data.append('file', this.up_file.current.files[0])

        fetch("http://180.71.228.163:8080/uploadFile?team_ID=" + id,
        {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(
                (res) => {           
                    this.setState({
                        files: res.data
                    })
                    console.log(this.state.files)
                    if(res.result == 200){
                        alert('파일 업로드 성공')
                        return <Route path="/posts" component={Posts}/>
                    }

                },
                (error) => {                                        
                    alert(error);
                }
            )
    }

    render(){
        let t_list = this.state.teams;
        const { boards } = this.state;

        return (
            <div className = "posts">
                <div className="select_group">
                    {t_list.map((name) => {
                        return <button onClick={(e) => this.setSelectedID(name.team_ID, e)}>
                                    {name.team_name}
                                </button>
                    })}
                    <hr />
                </div>


                {this.state.is_selected == true &&
                    <div className="inner">
                        <div className="upload_container">
                            <input type="file" ref={this.up_file} />
                            <button onClick={this.upload_file}>Upload</button>
                        </div>

                        <div className="boards_container">
                            <table>
                                <tbody>
                                    <tr align="left">
                                        <td id="title">Title</td>
                                    </tr>
                                    <tr><hr /></tr>
                                    <ol>
                                    {boards.map(row =>
                                        (<BoardItem key={row.brdno} row={row} />)
                                    )}
                                    </ol>
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

class GroupInfo extends Component{
    constructor(){
        super(...arguments)
        this.state = {
            id: this.props.id,
            name: this.props.name
        }
        this.clickBtn = this.clickBtn.bind(this)
    }

    clickBtn(){
        this.props.onSuccess(this.state.id);
    }

    render(){
        return(
            <div>
                <button className="select_btn" onClick={this.clickBtn}>{this.props.name}</button>
            </div>
        )
    }
}

class BoardItem extends Component {
    constructor(){
        super(...arguments)
        this.state={
            down:[]
        }
    }

    render(){
        return(
            <tr>
                <td>
                    <li>
                    {this.props.row.file_name}                    
                    <a href={"http://180.71.228.163:8080/downloadFile/"+this.props.row.file_name}>download</a>
                    </li>
                </td>
            </tr>
        )
    }
}
export default Posts;