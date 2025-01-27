import React from "react";
import {Editor} from 'react-draft-wysiwyg'
import { EditorState,convertFromRaw,convertToRaw} from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './Editor.css'

function Savededit(filename){
    return<div><div><span id="hd20">File Editor</span></div>
        <div><Savedt/></div></div>
}

class Savedt extends React.Component{
    constructor(){
        super();
        this.state = {
            k:0,
            editorState: EditorState.createEmpty(),
        }
        this.getvalue = this.getvalue.bind(this);
        this.save = this.save.bind(this);
        this.back = this.back.bind(this);
    }
    onEditorStateChange = (editorState) =>{
        this.setState({editorState,});
    };

    getvalue(e){
        e.preventDefault();
        fetch('http://localhost:5000/getvalue',{
				method:"POST",
				crossDomain:true,
				headers:{
					"Content-type":"application/json",
					Accept:'application/json',
					"Access-Control-Allow-Origin":"*"
				},
				body: JSON.stringify({userid:window.localStorage.getItem("usn"),filename:window.localStorage.getItem('filename')}),
			})
            .then((res) => res.json())
            .then((info) => {
				console.log(info.text)
                console.log(convertFromRaw(JSON.parse(info.text)))
                if(info.status === 'ok'){
                    this.setState({editorState : EditorState.createWithContent(convertFromRaw(JSON.parse(info.text)))})
                    // window.location.assign('./home')
                }
            })
        }

    rename(e){
        e.preventDefault();
        if(document.getElementById('filename').disabled===true){
            document.getElementById('filename').disabled = false;
        }
        else{
            const oldfilen = window.localStorage.getItem('filename');
            const filen = document.getElementById('filename').value;
            console.log(oldfilen,filen);
            if(filen!==oldfilen){
                fetch('http://localhost:5000/rename',{
                method:"POST",
                crossDomain:true,
                headers:{
                    "Content-type":"application/json",
                    Accept:'application/json',
                    "Access-Control-Allow-Origin":"*"
            },
                body: JSON.stringify({userid:window.localStorage.getItem('usn'),oldfile:oldfilen,newfile:filen})
            })
            .then((res)=>res.json())
            .then((info)=>{
                console.log(info.status);
                if(info.status==='ok'){
                    alert('Filename changed successfully');
                    window.localStorage.setItem('filename',filen);
                    window.location.assign('./seditor');
                }
                else if(info.status==='found'){
                    alert('Filename exists');
                }
                else if(info.status==='error'){
                    alert("Couldn't change the filename");
                    window.location.assign('./seditor');
                }
            })
        }
        }
    }

    save(e,rawState){
        e.preventDefault();
        console.log(rawState)
        // console.log(window.localStorage.getItem('usn'))
        fetch('http://localhost:5000/done',{
				method:"POST",
				crossDomain:true,
				headers:{
					"Content-type":"application/json",
					Accept:'application/json',
					"Access-Control-Allow-Origin":"*"
				},
				body: JSON.stringify({userid:window.localStorage.getItem('usn'),filename:window.localStorage.getItem('filename'),rawState:rawState}),
			})
            .then((res) => res.json())
            .then((info) => {
				console.log(info.status)
                if(info.status === 'ok'){
                    alert('File is saved')
                    window.location.assign('./seditor')
                }
                else if(info.status === 'error'){
                    alert("Sorry, we couldn't save the file")
                }
        })
    }

    back(e){
        e.preventDefault();
        window.location.assign('./home');
    }

    render(){
        const {editorState} = this.state;
        const rawState = convertToRaw(editorState.getCurrentContent());
        return<div id="edit" onLoad={(e)=>this.getvalue(e)}>
            <div><input id='filename' defaultValue={window.localStorage.getItem('filename')} disabled></input></div>
            <Editor editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}/>
            <div><button id="home" onClick={(e)=>{this.back(e)}}>Go to Home page</button><button id='bt20' onClick={(e)=>this.save(e,rawState)}>Save</button></div>
            <div><button id="rename" onClick={this.rename}>Rename</button></div>
        </div>
    }
}

export default Savededit;