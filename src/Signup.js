import React from 'react';
import './Signup.css';

function Signup(){
    return(
        <body id='body2'>
            <Rectangle/>
        </body>
    );
}

class Rectangle extends React.Component{
    constructor(props){
		super(props)
		this.state = {
			name:"",
			email:"",
            pass:"",
            cfpass:""
		};
		this.signup = this.signup.bind(this);
	}
    signup(event){
        event.preventDefault();
        const {name,email,pass,cfpass} = this.state
        console.log(name,email,pass,cfpass)
        if(pass!==cfpass)
        alert('Password and Confirm password must be same')
        if(pass===cfpass){
        fetch('http://localhost:5000/signupserver',{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-type":"application/json",
                Accept:'application/json',
                "Access-Control-Allow-Origin":"*"
            },
            body: JSON.stringify({
                name,email,pass,cfpass,
            }),
        })
        .then((res) => res.json())
        .then((info) => {
            console.log(info.status)
            if(info.status === 'ok'){
                alert('User is created')
                window.location.assign('./login')
            }
            else if(info.status === 'found'){
                alert('Username(email) exists!')
            }
            else if(info.status === 'error'){
                alert("Sorry, we couldn't create the user")
            }
        })
    }
}
    render(){
        return<div id='row'><div><span id='span5'>Sign up</span></div><div id='purple'>
            <form id='table1' onSubmit={this.signup}>
            <input id='input3' className='input1' placeholder='Name' required onChange={(e) => this.setState({ name: e.target.value })}/>
            <input id='input4' className='input1' placeholder='Email' required onChange={(e) => this.setState({ email: e.target.value })}/>
            <input id='input5' type='password' className='input1' placeholder='Password' required onChange={(e) => this.setState({ pass: e.target.value })}/>
            <input id='input6' type='password' className='input1' placeholder='Confirm Password' required onChange={(e) => this.setState({ cfpass: e.target.value })}/>
            <button id='button1'>Save and Sign up</button>
            </form>
            <img id="logo" src={require('./logo.png')} alt='logo'></img>
        </div></div>
    }
}

export default Signup;