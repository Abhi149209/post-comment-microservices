const express=require('express');
const {randomBytes} =require('crypto');
const axios=require('axios');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
app.use(bodyParser.json());
app.use(cors());
const comment={};

app.get('/posts/:id/comments',(req,res)=>{
    res.send(comment[req.params.id] || []) ;
    
});

app.post('/posts/:id/comments',(req,res)=>{
    const id=randomBytes(4).toString('hex');
    const {content}=req.body;

    const comments=comment[req.params.id] || [];
    comments.push({id:id,content});
    comment[req.params.id]=comments;

    axios.post('http://event-bus-srv:4005/events',{
        type:'CommentCreated',
        data:{
            id:id,content,postId:req.params.id
        }
    })
    res.status(201).send(comments);


});
app.post('/events',(req,res)=>{
    console.log('recieved event bus ', req.body.type);
    res.send({});
})

app.listen(4001,()=>{
    console.log('listening on port 4001');
});