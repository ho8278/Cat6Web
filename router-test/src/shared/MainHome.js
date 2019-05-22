
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import App from './App';
import LoginPanel from './LoginPanel';
import RegisterPanel from './RegeisterPanel';
import { withCookies, Cookies, ReactCookieProps, CookiesProvider, useCookies } from 'react-cookie';

class MainHome extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cookie: '',
        };

   }
   
   // componentWillMount(){
   //    this.state = {
   //       userId: '',
   //    };
   // }

   onLogin(cook){
      
      this.cookie = cook;
      this.setState({
         cookie: cook
      });
    }

   // onLogout(){
   //    this.setState({
   //       userId:''
   //    });
   // }

   onRegister(){
      this.setState({
         registerFlag: true
      });
   }
   
   render(){
      //return<RegisterPanel/>
      if(!this.state.cookie){
         return (
            <div>
               
               <LoginPanel onSuccess={this.onLogin.bind(this)} />
               <Route path="/signup" component={RegisterPanel} />
            </div>            
         );
      }
      else{
         return <App
         cookie={this.state.cookie}
         // onLogout={this.onLogout.bind(this)}
         />;
      }      
   }
}

export default MainHome;