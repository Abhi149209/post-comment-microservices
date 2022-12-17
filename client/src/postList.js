import React,{useState,useEffect} from 'react';
import CpmmentCreate from './commentCreate';
import CommentList from './commentList';
import axios from 'axios';

const Func=()=>{
    const [posts,setPosts]=useState({});
    const fetchPosts=async()=>{
        const res=await axios.get('http://event-srv:4002/posts');
        setPosts(res.data);
    }
    useEffect(()=>{

        fetchPosts();
    },[]); // empty [] tells react to call func only once 

    const renderedPosts=Object.values(posts).map(post=>{
        return <div 
        className='card'
        style={{width:'30%',marginBottom:'20px'}}
        key={post.id}
        >
            <div className='card-body'>
                <h3>{post.title}</h3>
                <CommentList comments={post.comments}/>
                <CpmmentCreate postId={post.id}/>
            </div>


        </div>
    });
    return <div className='d-flex flex-row flex-wrap justify-content-between'>
        {renderedPosts}

    </div>
};
export default Func;