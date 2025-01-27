import React from "react";
import {Link} from 'react-router-dom'
import {Editor} from 'react-draft-wysiwyg'
import { EditorState,convertToRaw } from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './Editor.css'

function Edit(){
    return<div><div><span id="hd20">File Editor</span></div>
        <div><Edt/></div></div>
}

class Edt extends React.Component{
    state = {
        editorState: EditorState.createEmpty(),
    }

    onEditorStateChange = (editorState) =>{
        this.setState({editorState,});
    };

    save(e,rawState){
        e.preventDefault();
        console.log(rawState)
        const filename = document.getElementById('filename').value;
        if(filename==='')
        alert('Give the file name')
        else{
            console.log(filename)
            fetch('http://localhost:5000/save',{
				method:"POST",
				crossDomain:true,
				headers:{
					"Content-type":"application/json",
					Accept:'application/json',
					"Access-Control-Allow-Origin":"*"
				},
				body: JSON.stringify({userid:window.localStorage.getItem('usn'),filename:filename,rawState:rawState}),
			})
            .then((res) => res.json())
            .then((info) => {
				console.log(info.status)
                if(info.status === 'ok'){
                    alert('File is saved')
                    window.localStorage.setItem("filename",filename)
                    window.location.assign('./seditor')
                }
                else if(info.status === 'found'){
                    alert('Filename exists!')
                }
                else if(info.status === 'error'){
                    alert("Sorry, we couldn't save the file")
                }
        })
        }
    }

    render(){
        const {editorState} = this.state;
        const rawState = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        return<div id="edit">
            <div><input id='filename' required></input></div>
            <Editor editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}/>
            <div><Link to='/home'><button id="home">Go to Home page</button></Link><button id='bt20' onClick={(e)=>this.save(e,rawState)}>Save</button></div>
        </div>
    }
}

export default Edit;