
import React, { Component } from 'react';
import App from './App';
import LoginPanel from './LoginPanel';
import RegisterPanel from './RegeisterPanel';

class MainHome extends Component {
    
	componentWillMount(){
		this.state = {
			userId: '',
		};
	}

	onLogin(adminId){
		this.setState({
			userId:adminId
		});
    }

	onLogout(){
		this.setState({
			userId:''
		});
	}

	onRegister(){
		this.setState({
			registerFlag: true
		});
	}
	render(){
		//return<RegisterPanel/>
		if(!this.state.userId){
			return <LoginPanel 
					onSuccess={this.onLogin.bind(this)} 
					/>;
		}

		return <App 
		    userId={this.state.userId}
			onLogout={this.onLogout.bind(this)}
        	/>;
	}
}
export default MainHome;