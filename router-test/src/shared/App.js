import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { Home, About, Posts, Mypage, Channels, Conference, Direct } from 'pages';
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
        <Header />
        <div className="my_content">
          <div className="left">
            <div className="client_channels_list_container">
              {/* <div className="groups_nav_container">
                  <Groups_Nav />
                </div> */}
              <div className="menu_nav_container">
                <Menu />
<<<<<<< HEAD
                <hr width="150px" />
                <Channels_Nav />
                <hr width="150px" />
=======
                <hr width="250px" />
                <Channels_Nav />
                <hr width="250px" />
>>>>>>> 1cf660f8e896eee8c10a6f1241738d8cd6360234
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
              <Route path="/myPage" component={Mypage} />
              <Route path="/channels" component={Channels} />
              <Route path="/conference" component={Conference} />
              <Route path="/direct" component={Direct} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;