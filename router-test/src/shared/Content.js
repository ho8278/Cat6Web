import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { Home, Posts, Conference } from 'pages';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            selected_team_id: ''
        }
    }

    componentDidMount() {
        let id = window.sessionStorage.getItem('id');

        fetch("http://180.71.228.163:8080/viewTeams/n?client_ID=" + id)
            .then(res => res.json())
            .then(
                (res) => {
                    console.log(res.data)
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

    setSelectedID(id) {
        this.setState({
            selected_team_id: id
        })
    }

    render() {
        let t_list = this.state.teams

        return (
            <div>
                <div className="select_group">
                    {t_list.map((name) => {
                        return (<Groupinfo onSuccss={this.setSelectedID.bind(this)} name = {name.team_name} id = {name.team_ID}/>)
                    })}
                </div>

                <div className="inner_content"> 
                    <Route path='/' component={Home} id={this.state.selected_team_id}/>
                    <Route path='/conference' component={Conference} id={this.state.selected_team_id}/>
                    <Route path='/posts' component={Posts} id={this.state.selected_team_id}/>
                </div>
            </div>
        )
    }
}

class Groupinfo extends Component{

    constructor() {
      super(...arguments);
      this.state = {
          id : this.props.id,
          name : this.props.name
      }
      this.n_click = this.n_click.bind(this)
    }
  
    n_click(){
      this.props.onSuccss(this.state.id)
    }
  
    render(){  
      const activeStyle2 = { 
        fontWeight: 'bold',
        color: 'rgb(241, 210, 71)',
        fontSize: '18px'
      };
  
      return(
        <div>
            <button onClick={this.n_click}>
              {this.props.name}
            </button>    
        </div>
      )
    }
  }
export default Content;