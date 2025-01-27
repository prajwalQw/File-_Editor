import React from 'react'
import { Link } from 'react-router-dom';
import './Realhome.css'

class Realhome extends React.Component{
    constructor(props){
		super(props)
		this.state = {
			files:[]
		};
		this.file = this.file.bind(this);
        this.click = this.click.bind(this);
        this.logout = this.logout.bind(this);
        this.delete = this.delete.bind(this);
	}
        delete(e,element){
            e.preventDefault();
            const confirm = window.confirm("Do you really want to delete",element);
            if(confirm===true){
                fetch('http://localhost:5000/rdelete',{
				method:"POST",
				crossDomain:true,
				headers:{
					"Content-type":"application/json",
					Accept:'application/json',
					"Access-Control-Allow-Origin":"*"
				},
				body: JSON.stringify({
					userid:window.localStorage.getItem('usn'),filename:element,
				}),
			})
			.then((res) => res.json())
			.then((info) => {
				if(info.status === 'ok'){
                    alert('File deleted');
                    window.localStorage.setItem('files',info.files)
                    window.location.assign('./home')
				}
				else if(info.status === 'error'){
					console.log('error')
                    alert("Couldn't delete the file!");
				}
			})
            }
        }
            logout(e){
            e.preventDefault();
            window.localStorage.clear();
            window.location.assign('./login')
        }
    
        click(e,element){
            e.preventDefault();
            window.localStorage.removeItem("filename")
            window.localStorage.setItem("filename",element)
            window.location.assign('./seditor')
        }
		file(){
			fetch('http://localhost:5000/home',{
				method:"POST",
				crossDomain:true,
				headers:{
					"Content-type":"application/json",
					Accept:'application/json',
					"Access-Control-Allow-Origin":"*"
				},
				body: JSON.stringify({
					usn:window.localStorage.getItem('usn')
				}),
			})
			.then((res) => res.json())
			.then((info) => {
				if(info.status === 'ok'){
                    window.localStorage.setItem('files',info.files)
				}
				else if(info.status === 'error'){
					console.log('error')
				}
			})
	}
    render(){
        console.log(window.localStorage.getItem('files'))
        var fileitems = window.localStorage.getItem('files')
        console.log(fileitems)
        var fileitemarr = fileitems.split(',')
        console.log(fileitemarr);
        if(fileitemarr===''){
            fileitemarr = undefined;
        }
        return<div onLoad={this.file}>
            <div id='bar1'><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <div id='hd1'>
            <span id='home1'>File Editor</span>
            <span id='home2'>Hi {window.localStorage.getItem('name')}</span>
            <img id="logo3" src={require('./logo.png')} alt='logo'></img>
            <Link to='/editor'><button id='bt100'>Create</button></Link>
            <Link to='/myprofile'><button id='bt10'>My profile</button></Link>
            <button id='bt200' onClick={(e)=>{this.logout(e)}}>Logout</button>
            </div>
            <div id='files'>
            {
                fileitemarr.map((element)=>{
                return<div><div className='divfile' onClick={(e)=>this.click(e,element)}>{element}</div><span className='deletec'><img id='delete'src={require('./delete.png')} alt="delete" onClick={(e)=>{this.delete(e,element)}}/></span></div>
            })}
            </div>
            </div>
        </div>
    }
}

export default Realhome;