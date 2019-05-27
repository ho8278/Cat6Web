import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { Home, About, Posts, Mypage, Channels, Conference, DirectMessage, DropOut, CreateGroup, LeaveGroup, DropGroup, myDirectmsg } from 'pages';
import Menu from 'components/Menu';
import Header from 'components/Header';
import Channels_Nav from 'components/Channels_Nav';
import DirectMessage_Nav from 'components/DirectMessage_Nav';
import './App.css';
import InviteGroup from '../pages/InviteGroup';
import Invite from '../pages/Invite';
import Content from 'shared/Content';

class App extends Component {
  constructor() {
    super(...arguments);
    this.state = {
        cookie: this.props.cookie
    };

  }

  render() {
    
    return (
      <div className="zu0p">
        <Header cookie = {this.state.cookie}
          // onLogout={this.props.onLogout.bind(this.props)}
           />

        <div className="my_content">

          <div className="left">
            <div className="client_channels_list_container">
              <div className="menu_nav_container">
                <Menu />
                <hr width="250px" />
                <Channels_Nav />
                <hr width="250px" />
                <DirectMessage_Nav />
              </div>
            </div>

            <div className="client_main_container">
              <Route exact path="/" component={Home} />
              <Switch>
                <Route path="/about/:name" component={About} />
                <Route path="/about" component={About} />
              </Switch>
              <Route path="/posts" component={Posts} />
              <Route exact path="/myPage" component={Mypage} />
              <Route path="/channels" component={Channels} />
              <Route path="/conference" component={Conference} />
              <Route path="/dropOut" component={DropOut} />
              <Route path="/createGroup" component={CreateGroup} />
              <Route path="/inviteGroup" component={InviteGroup} />
              <Route path="/leaveGroup" component={LeaveGroup} />
              <Route path="/dropGroup" component={DropGroup} />
              <Route path="/content" component={Content} />
              <Route path="/dm" component={DirectMessage}/>
              <Route path="/myDirectmsg" component={myDirectmsg}/>
              {/* <Route path={`/${this.props.id}`} component={Home}/> */}
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;