import React from 'react'
import {Link} from 'react-router-dom'
import './Profile.css'

function Profile(){
    return<div>
        <Prof/>
    </div>
}

class Prof extends React.Component{
    render(){
        return<div><div id='prof1'>
            <span id='profile1'>My Profile</span>
        </div>
        <img id="logo4" src={require('./logo.png')} alt='logo'></img>
        <div id='box'>
            <input id='input21' defaultValue={window.localStorage.getItem('name')} disabled/>
            <input id='input22' defaultValue={window.localStorage.getItem('usn')} disabled/>
            <Link to='/verifyuser'><button id='changepassword'>Change Password</button></Link>
        </div>
        </div>
    }
}

export default Profile