import React from 'react'
import './Chps.css';

function Chps(){
    return<body>
        <Check/>
    </body>
}


class Check extends React.Component{
    constructor(){
        super();
        this.state={
            usn:''
        };
        this.verify = this.verify.bind(this);
    }
    verify(e){
        e.preventDefault();
        const usn = this.state.usn;
        fetch('http://localhost:5000/userverify',{
				method:"POST",
				crossDomain:true,
				headers:{
					"Content-type":"application/json",
					Accept:'application/json',
					"Access-Control-Allow-Origin":"*"
				},
				body: JSON.stringify({
					usn,
				}),
			})
			.then((res) => res.json())
			.then((info) => {
				console.log(info.status)
				if(info.status === 'ok'){
					alert('Username is verified')
                    window.localStorage.removeItem('usn');
                    window.localStorage.setItem('usn',usn)
					window.location.assign('./changeps')
				}
				else if(info.status === 'error'){
					alert('User does not exist')
				}
			})
    }
    render(){
        return<div>
            <span id = 'newspan'>Change Password</span>
            <form id='chps'><input id='username' placeholder='Username' onChange={(e)=>this.setState({usn:e.target.value})}>
            </input><button id='check' onClick={(e)=>this.verify(e)}>Verify</button>
            </form>
        </div>
    }
}

export default Chps;