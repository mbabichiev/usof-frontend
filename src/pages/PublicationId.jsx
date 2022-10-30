import React, { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";

import PostService from "../API/PostService";
import Comments from "../components/Comments";
import Content from "../components/Content";
import EditPost from "./EditPublication";
import Loader from "../components/UI/Loader/Loader";
import Categories from "../components/Categories";
import PostImg from "../components/UI/Img/PostImg/PostImg";
import Textarea from "../components/UI/Textarea/Textarea";
import OutlineButton from "../components/UI/Button/OutlineButton/OutlineButton";
import PostReactions from "../components/PostReactions";

const getCookie = require("../scripts/getCookie.js")

const PublicationId = () => {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState({categories: []});
    const [isDelete, setIsDelete] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [allComments, setAllComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    let author_id = getCookie("id");


    async function getPost(id) {
        setPost(await PostService.getPostById(id));
    }


    async function getAllComments() {
        if(params.id) {
            setAllComments(await PostService.getCommentsUnderPostById(params.id));
        }
        setIsLoading(false)
    }

    
    async function deletePost() {
        if(window.confirm("Do you want to delete the publication?")) {
            await PostService.deletePostById(params.id);
            setIsDelete(true);
        }
    }


    async function addComment() {
        if(newComment.length === 0) {
            return alert("You can't add empty comment")
        }
        await PostService.addCommentUnderPostById(params.id, author_id, newComment);
        setNewComment("")
        getAllComments();
    }


    async function deleteComment(id) {
        await PostService.deleteCommentById(id);
        getAllComments();
    }


    useEffect(() => {
        getPost(params.id);
        getAllComments();
    }, [params.id])


    if(isDelete) {
        return <Navigate to="/posts"/>
    }

    if(isUpdate) {
        return <EditPost post={post}/>
    }

    if(isLoading) {
        return <Loader/>
    }

    return (
        <div className="fw-light">          

            <section className="flex-wrap row py-lg-5 text-center col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">{post.title}</h1><br/>

                <h2 className="fw-light">by {" "}
                    <Link style={{color:"white"}} to={`/authors/${post.author_id}`}>
                        {post.author}
                    </Link><br/><br/>
                </h2>

                <h3 className="fw-light">
                    Publish date: {new Date(post.publish_date).toLocaleString()}<br/>
                    <Categories categories={post.categories}/>
                </h3>
            </section>  

            <PostImg id={post.id} />
                            
            <div className="container py-3">
                <div className="card shadow-sm">
                    <div className="container d-flex justify-content-between align-items-center">

                        <div className="py-1 col-md-3 mb-0">
                            <PostReactions post_id={params.id} numberOfLikes={post.likes} numberOfDislikes={post.dislikes} />
                        </div>

                        <div className="nav col-md-4 justify-content-end">
                            { getCookie("role") === "admin" && getCookie("id")
                                ? 
                                    <div>
                                        <Link onClick={() => {setIsUpdate(true)}} className="btn btn-sm btn-outline-primary">Edit</Link>
                                        <Link onClick={deletePost} className="btn btn-sm btn-outline-primary">Delete</Link>
                                    </div>
                                :
                                    String(post.author_id) === getCookie("id") &&
                                        <div>
                                            <Link onClick={() => {setIsUpdate(true)}} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            <Link onClick={deletePost} className="btn btn-sm btn-outline-secondary">Delete</Link>
                                        </div>
                            }
                        </div>  
                    </div>

                    <div style={{background:"black", color: "white"}} className="px-4 py-5 fw-light">
                        <Content content={post.content}/>
                    </div>

                    { author_id &&
                        <div style={{background:"rgb(75, 75, 75)", color: "white", width: "100%"}} className="fw-light px-3 py-3 border">
                            <Textarea 
                                placeholder="Write your comment..."
                                onChange={e => setNewComment(e.target.value)}
                                value={newComment}
                                rows={5}
                            />
                                                
                            {newComment.length === 0
                                ? <OutlineButton disabled onClick={addComment}>Add comment</OutlineButton>
                                : <OutlineButton onClick={addComment}>Add comment</OutlineButton>
                            }
                        </div>
                    }

                    <Comments comments={allComments} deleteComment={deleteComment}/>
                </div>
            </div>
        </div>
    )
}

export default PublicationId;