import React, {Component} from 'react';
import { NavLink, Route } from 'react-router-dom';
import './Menu.css';
import { timingSafeEqual } from 'crypto';
import Home from '../pages/Home';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        teams: [],
        selected_team_id: ''
    }
  }

  componentDidMount(){
    let id = window.sessionStorage.getItem('id');

    fetch("http://180.71.228.163:8080/viewTeams/n?client_ID="+id)
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

  setSelectedID(id){
    this.setState({
        selected_team_id: id
    })
    //이 다음 해당 팀의 일정 조회 해야댐
  }

  render() {
    const  listStyle ={
      listStyle: 'none'
    };

    const activeStyle = { 
      fontWeight: 'bold',
      color: 'rgb(241, 210, 71)',
      fontSize: '23px'
    };

    let t_list = this.state.teams;

    return(
      <div>
        <div className="group_container">
          <label className="group_name">Menu</label>    
        </div>

        <div className="menu_list_container">
          <nav>
            <ul className="menu_list" style={listStyle}>              
              <li className="menu_item"><NavLink exact to ='/' className="menu_link" activeStyle={activeStyle}>Calendars</NavLink>
              {/* <ul style={listStyle}>

                  {t_list.map((name) => {
                    return (<GroupCalendar onSuccss={this.setSelectedID.bind(this)} name = {name.team_name} id = {name.team_ID}/>)
                  })}
                </ul> */}
              </li>

              <li className="menu_item"><NavLink exact to="/conference" activeStyle={activeStyle} className="menu_link">Conference</NavLink></li>
              {/* <li className="menu_item">Conference
              <ul style={listStyle}>
                  {t_list.map((name) => {
                    return (<GroupConference onSuccss={this.setSelectedID.bind(this)} name = {name.team_name} id = {name.team_ID}/>)
                  })}
                </ul>
              </li> */}

              <li className="menu_item"><NavLink exact to="/posts" activeStyle={activeStyle} className="menu_link">Posts</NavLink></li>
              {/* <li className="menu_item">Posts
              <ul style={listStyle}>
                  {t_list.map((name) => {
                    return (<GroupPosts onSuccss={this.setSelectedID.bind(this)} name = {name.team_name} id = {name.team_ID}/>)
                  })}
                </ul>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

class GroupCalendar extends Component{

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
        <li>
          <NavLink exact to={`/${this.props.id}`}
            activeStyle={activeStyle2}
            className="menu_link"
            onClick={this.n_click}
            
            //Calendar로 넘어갈 때 필요한 props
            id = {this.props.id}>
            {this.props.name}
          </NavLink>          
        </li>
      </div>
    )
  }
}

class GroupConference extends Component{

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
        <li>
          <NavLink exact to="/conference"
            activeStyle={activeStyle2}
            className="menu_link"
            onClick={this.n_click}
            
            //Conference로 넘어갈 때 필요한 props
            id = {this.props.id}>
            {this.props.name}
          </NavLink>
        </li>
      </div>
    )
  }
}

class GroupPosts extends Component{

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
        <li>
          <NavLink exact to="/posts"
            activeStyle={activeStyle2}
            className="menu_link"
            onClick={this.n_click}
            
            //Posts로 넘어갈 때 필요한 props
            id = {this.props.id}>
            {this.props.name}
          </NavLink>
        </li>
      </div>
    )
  }
}

export default Menu;