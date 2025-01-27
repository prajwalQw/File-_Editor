import React from 'react'
import './Chps2.css';

function Chps2(){
    return<div>
        <Check2/>
    </div>
}

class Check2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pass:"",
            cfpass:"",
        };
        this.change = this.change.bind(this);
    }
    change(event){
        event.preventDefault();
        const {pw,cfpw} = this.state
		console.log(this.state.pass,this.state.cfpass)
        if(this.state.pass!==this.state.cfpass)
        alert('Password and Confirm password must be same')
        else if(this.state.pass===this.state.cfpass){
        fetch('http://localhost:5000/password',{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-type":"application/json",
                Accept:'application/json',
                "Access-Control-Allow-Origin":"*"
            },
            body: JSON.stringify({
                usn:window.localStorage.getItem('usn'),pass:this.state.pass,
            }),
        })
        .then((res) => res.json())
        .then((info) => {
            console.log(info.status)
            if(info.status === 'ok'){
                alert('Password changed successfully')
                window.location.assign('./login')
            }
            else if(info.status === 'error'){
                alert("Sorry, we couldn't change the password")
            }
        })
    }
    }
    render(){
        return<div>
            <span id = 'newspan2'>Change Password</span>
            <form id='chps2' onSubmit={this.change}><input id='pass' type='password' placeholder='New Password' required onChange={(e)=>this.setState({pass: e.target.value })}>
            </input><input id='pass2' type='password' placeholder='Confirm Password' required onChange={(e)=>this.setState({cfpass: e.target.value })}>
            </input><button id='check2'>Save</button>
            </form>
        </div>
    }
}

export default Chps2;