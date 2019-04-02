import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Posts, Mypage, Channels, Conference, Direct } from 'pages';
import Menu from 'components/Menu';
import Header from 'components/Header';

class App extends Component {
    render() {
        return(
          <div>
              <Header />
              <Menu />
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
        );
    }
}

export default App;