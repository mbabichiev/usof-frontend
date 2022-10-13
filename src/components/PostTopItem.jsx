import React from "react";
import { Link } from "react-router-dom";


const PostTopItem = ({post}) => {

    return (

        <div style={{background:"black", color: "white"}} className="px-3 py-3 border row" >

            <div style={{fontSize: "20px"}} className="fw-light col-md-7 py-3 order-md-2">
                <Link style={{ color:"white"}} to={`/posts/${post.id}`}><strong>{post.title}</strong></Link><br/>
                by <Link style={{ textDecoration: 'none', color:"white"}} to={`/authors/${post.author_id}`}><strong>{post.author}</strong></Link>
            </div>

        </div>
    )
}

export default PostTopItem;