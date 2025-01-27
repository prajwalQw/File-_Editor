import './Home.css';
import React from 'react'
import {Link} from 'react-router-dom';

function Home() {
	return (
		<div>
			<Page/>
		</div>
	);
	}
	
	class Page extends React.Component{
		render(){
				return<div><div id="top"><br/><br/><br/><br/><br/>
				<Link to ='/login'><button id="login" className='button'>Login</button></Link>
				<img id="logo" src={require('./logo.png')} alt='logo'></img>
				</div>
				<div id="head">File Editor</div>
				<Slogan/>
				</div>
			}
	}

	class Slogan extends React.Component{
		render(){
				return<div id="slogan">Create New<br/>Add New
				<Link to='login'>
				<button id="start" className="button">Get started</button></Link>
				</div>
		}
	}
	
	export default Home;