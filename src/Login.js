import './Login.css';
import React from 'react'
import {Link } from 'react-router-dom';

function Login() {
	return (
		<div id='body1'>
			<br></br><span id='span1'>Login</span>
			<Rectangl/>
		</div>
	);
}

class Rectangl extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			usn:"",
			pw:""
		};
		this.check = this.check.bind(this);
	}
		check(event){
			event.preventDefault();
			const {usn,pw} = this.state
			console.log(usn,pw)
			fetch('http://localhost:5000/loginserver',{
				method:"POST",
				crossDomain:true,
				headers:{
					"Content-type":"application/json",
					Accept:'application/json',
					"Access-Control-Allow-Origin":"*"
				},
				body: JSON.stringify({
					usn,pw,
				}),
			})
			.then((res) => res.json())
			.then((info) => {
				console.log(info.status)
				if(info.status === 'ok'){
					alert('Login is succesfull')
					window.localStorage.setItem("usn",usn)
					window.localStorage.setItem('name',info.name)
					window.localStorage.setItem("files",info.files)
					window.location.assign('./home')
				}
				else if(info.status === 'invp'){
					alert('Invalid Password')
				}
				else if(info.status === 'error'){
					alert('User does not exist')
				}
			})
	}
	render(){
		return<div id="Rectangle">
			<form id="table" onSubmit={this.check}>
			<input id='input1' type='email' placeholder='Email id' required onChange={(e) => this.setState({ usn: e.target.value })} pattern='[a-z]{1,}[0-9]{0,}@gmail.com'></input>
			<input id='input2' type='password' placeholder='Password' required onChange={(e) => this.setState({ pw: e.target.value })}></input>
			<button id='button'>Login</button>
			<Link to='/verifyuser'><span id='span2'>Forgot password?</span></Link>
			<Link to='/signup'>
			<span id='span3'>Not a User! Sign up!</span></Link>
			</form></div>
		}
}

export default Login;