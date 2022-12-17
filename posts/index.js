const express=require('express');
const {randomBytes} =require('crypto');
const bodyParser=require('body-parser');
const cors=require('cors');
const axios =require('axios');

const app=express();
app.use(bodyParser.json());
app.use(cors());
const post={};

app.get('/posts',(req,res)=>{
    console.log('reached');
    res.send(post);
    
});

app.post('/posts',(req,res)=>{
    console.log("created");
    const id=randomBytes(4).toString('hex');
    const {title}=req.body;
    post[id]={
        id,title
    };
   
    axios.post('http://event-bus-srv:4005/events',{
        type:'PostCreated',
        data:{
            id,title
        }
    })
    res.status(201).send(post[id]);


});
app.post('/events',(req,res)=>{
    console.log('recieved event-bys bus ', req.body.type);
    res.send({});
})
app.listen(4000,()=>{
    console.log('updated to v20');
    console.log('listening on port 4000');
});