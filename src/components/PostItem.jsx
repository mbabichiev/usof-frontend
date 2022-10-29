import React from "react";
import {Link} from "react-router-dom";
import Content from "./Content.jsx";
import PostReactions from "./PostReactions.jsx";

const getPartOfText = require("../scripts/getPartOfText.js");

const PostItem = (props) => {

    let partOfContent = getPartOfText(props.post.content, 550, 4)

    return (
        <div className="py-3">
            <div className="card shadow-sm">

                <Link style={{ textDecoration: 'none'}} to={`/posts/${props.post.id}`}>
                    <div style={{background:"black", color: "white"}} className="fw-light text-center px-4 py-5">
                        <p>{props.post.title}</p>
                        <Content content={partOfContent}/>
                    </div>
                </Link>

                <div className="container d-flex justify-content-between align-items-center py-3">
                    <div className="col-md-4 mb-0">
                        <Link to={`/authors/${props.post.author_id}`} className="btn btn-sm btn-outline-secondary">{props.post.author}</Link>
                    </div>

                    <div className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <PostReactions post_id={props.post.id} numberOfLikes={props.post.likes} numberOfDislikes={props.post.dislikes} />
                    </div>

                    <div className="nav col-md-4 justify-content-end">
                        {props.post.categories[0]
                            ? <Link to={`/categories/${props.post.categories[0].id}`} className="btn btn-sm btn-outline-secondary">{props.post.categories[0].title}</Link>
                            : <text className="btn btn-sm btn-outline-secondary">None</text>
                        }
                    </div>
                </div>

            </div>
        </div>
    )

}

export default PostItem;