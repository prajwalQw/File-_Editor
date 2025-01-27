var express = require('express');
var mongoose = require('mongoose');
const cors = require('cors');

var uri ='mongodb://127.0.0.1:27017/Project';

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connected to database");
})
.catch((e)=>{console.log(e)})

const app = express();
app.use(cors())
app.use(express.json())
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
    {
        name:String,
        email:String,
        password:String,
        filenames:[{type:String}],
    },
    {
        collection:'Users'
    }
);
const user = mongoose.model('Users',UserSchema)

const Save = new mongoose.Schema(
    {
        userid : String,
        filename : String,
        rawstate : String,
    },
    {
        collection:'Files'
    }
);
const file = new mongoose.model('Files',Save)

app.post('/loginserver',async(req,res)=>{
    const {usn,pw} = req.body;
    const usen = await user.findOne({email:usn})
    if(!usen){
        return(res.json({status:'error'}))
    }
    try
    {
        if((await bcrypt.compare(pw,usen.password))){
            return(res.json({status:'ok',name:usen.name,files:usen.filenames}))
        }
        else{
            return(res.json({status:'invp',error:"Invalid password"}))
        }
    }
    catch(error){
        res.json({status:'error'})
    }
})

app.post('/signupserver',async(req,res)=>{
    const {name,email,pass,cfpass} = req.body;
     try{
        const mail = await user.findOne({email:email})
        if(mail!==null && mail.email===email){
            res.send({status:'found'})
        }
        else{
            const ps = await bcrypt.hash(pass,10)
            await user.create({
                name,
                email,
                password : ps,
                filenames: [],
            });
            res.send({status:'ok'})
        }
    }
    catch(error){
        res.send({status:'error'})
    } 
})

app.post('/home',async(req,res)=>{
    const {usn} = req.body;
    try{
        const mail = await user.findOne({emai:usn})
        if(mail!==null && mail.email==usn){
            res.send({status:'ok',files:mail.filenames})
        }
    }
    catch(error){
        res.send({status:'error'})
    }
})

app.post('/save',async(req,res)=>{
    const {userid,filename,rawState} = req.body;
    try{
        const mail = await user.findOne({email:userid})
        var k=0;
        for(var i=0;i<mail.filenames.length;i++){
            if(mail.filenames[i]==filename)
            k=1;
        }
        if(k==0){
            mail.filenames.push(filename)
            mail.save()
            await file.create({
                userid:userid,
                filename:filename,
                rawstate:rawState,
            })
            res.send({status:'ok'})
        }
        else{
            res.send({status:'found'})
        }
        console.log(mail);
    }
    catch(error){
        res.send({status:'error'})
    }
})

app.post('/getvalue',async(req,res)=>{
    const {userid,filename} = req.body;
    try{
        const mail = await file.findOne({userid:userid,filename:filename})
        if(mail!==null){
            res.send({status:'ok',text:mail.rawstate})
        }
    }
    catch(error){
        res.send({status:'error'})
    }
})

app.post('/done',async(req,res)=>{
    const {userid,filename,rawState} = req.body;
    try{
        const mail = await file.findOne({userid:userid,filename:filename})
        console.log(mail)
        if(mail!==null){
            mail.rawstate = JSON.stringify(rawState);
            mail.save()
            res.send({status:'ok',text:mail.rawstate})
        }
    }
    catch(error){
        res.send({status:'error'})
    }
})

app.post('/rdelete',async(req,res)=>{
    const {userid,filename} = req.body;
    console.log(userid,filename);
    try{
        const mail = await file.findOne({userid:userid,filename:filename})
        const arrayfile = await user.findOne({email:userid})
        console.log(mail);
        console.log(arrayfile)
        if(mail!==null && arrayfile!=null){
            file.remove({userid:userid,filename:filename})
            arrayfile.filenames.remove(filename);
            arrayfile.save();
            res.send({status:'ok',files:arrayfile.filenames})
        }
    }
    catch(error){
        res.send({status:'error'})
    }
})

app.post('/rename',async(req,res)=>{
    const {userid,oldfile,newfile} = req.body;
    console.log(userid,oldfile,newfile);
    try{
        const mail = await user.findOne({email:userid})
        console.log(mail);
        const rfile = await file.findOne({userid:userid,filename:oldfile})
        console.log(rfile);
        var k=0;
        for(var i=0;i<mail.filenames.length;i++){
            if(mail.filenames[i]==newfile)
            k=1;
        }
        if(k===0){
            if(mail!== null && rfile !== null){
                mail.filenames.remove(oldfile);
                mail.filenames.push(newfile);
                mail.save();
                rfile.filename = newfile;
                rfile.save();
                res.send({status:'ok'})
            }
            else{
                res.send({status:'error'});
            }
        }
        else if(k===1){
            res.send({status:'found'});
        }
    }
    catch(error){
        res.send({status:'error'})
    }
})

app.post('/userverify',async (req,res)=>{
    const {usn} = req.body;
    try{
        const mail = await user.findOne({email:usn})
        if(mail!==null){
            res.send({status:'ok'})
        }
        else{
            res.send({status:'error'})
        }
    }
    catch(error){
        res.send({status:'error'})
    }
})

app.post('/password', async(req,res)=>{
    const {usn,pass} = req.body;
    try{
        const mail = await user.findOne({email:usn})
        if(mail!==null){
            const ps = await bcrypt.hash(pass,10)
            mail.password = ps;
            mail.save()
            res.send({status:'ok'})
        }
        else{
            res.send({status:'error'})
        }
    }
    catch(error){
        res.send({status:'error'})
    }
})

app.listen(5000,()=>{
    console.log("Good things are happening")
})