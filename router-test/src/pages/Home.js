import React, { Component } from 'react';
import Calendar from 'react-calendar';

class Home extends Component {
    state = {
        date: new Date()
    }

    onChange = date => this.setState({date})

    render(){
        return(
          <div>
              <h2>Home</h2>
              <Calendar 
                onChange={this.onChange} 
                value={this.state.date} 
              />
          </div>
        );
    }
};

export default Home;