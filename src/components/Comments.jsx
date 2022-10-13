import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PostService from "../API/PostService";
import CommentItem from "./CommentItem";

const Comments = (props) => {

    return (
        <div style={{width: "100%"}}>
            {props.comments.map(comment => 
                <CommentItem comment={comment} key={comment.id} deleteComment={props.deleteComment} />    
            )}
        </div>   
    )
}

export default Comments;