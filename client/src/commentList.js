import React  from 'react';

const Func= ({comments}) => {


    const renderComments=comments.map(comment=>{
        return <l1 key={comment.id}>{comment.content}</l1>
    })
    return <ul>{renderComments}</ul>;

};
export default Func;