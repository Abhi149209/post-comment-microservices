import React,{useState}  from "react";
import axios from 'axios';
const Func= ({postId})=>{
    const [content,setContent]=useState('');
    const onSubmit= async (event) => {
        event.preventDefault();
        await axios.post(`http://comments-srv::4001/posts/${postId}/comments`,{
            content
        });
        setContent('');
    };


    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New Comments</label>
                <input value={content} onChange={e=>setContent(e.target.value)} className="form-control"/>
            </div>
            <button className="btn btn-primary"></button>
        </form>
    </div>

};
export default Func;