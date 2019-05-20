import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { Home, About, Posts, Mypage, Channels, Conference, Direct, DropOut, CreateGroup } from 'pages';
import Menu from 'components/Menu';
import Header from 'components/Header';
import Groups_Nav from 'components/Groups_Nav';
import Channels_Nav from 'components/Channels_Nav';
import DirectMessage_Nav from 'components/DirectMessage_Nav';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="zu0p">
        
          <Header 
          onLogout={this.props.onLogout.bind(this.props)}/>

          <div className="my_content">
            <div className="left">
              <div className="client_channels_list_container">
                {/* <div className="groups_nav_container">
                <Groups_Nav />
                </div> */}
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
                <Route path="/direct" component={Direct} />
                <Route path="/dropOut" component={DropOut} />
                <Route path="/createGroup" component={CreateGroup} />
              </div>
            </div>
          </div>
        </div>
    
    );
  }
}

export default App;