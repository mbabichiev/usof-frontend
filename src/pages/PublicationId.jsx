import React, { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";

import PostService from "../API/PostService";
import LikeService from "../API/LikeService";
import Category from "../components/Category";
import Comments from "../components/Comments";
import UpdatePage from "./UpdatePage";
import Loader from "../components/UI/Loader/Loader";

const getCookie = require("../scripts/getCookie.js")

const PublicationId = () => {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [post, setPost] = useState({categories: []});
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);
    const [sumLikes, setSumLikes] = useState(0);
    const [sumDislikes, setSumDislikes] = useState(0);
    const [isDelete, setIsDelete] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [allComments, setAllComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    let author_id = getCookie("id");
    let publish_date = new Date(post.publish_date).toLocaleString();


    async function checkIfLikeExist() {

        if(author_id) {
            
            let result = await LikeService.checkIfLikeExistUnderPost(author_id, params.id);

            if(result === "like") {

                setIsLike(true);
                setIsDislike(false);
            }
            else if(result === "dislike") {

                setIsLike(false);
                setIsDislike(true);
            }
            else {
                setIsLike(false);
                setIsDislike(false);
            }
        }

    }

    async function getPost(id) {

        const response = await PostService.getPostById(id);
        setPost(response)
        setSumLikes(response.likes)
        setSumDislikes(response.dislikes)
    }


    async function getAllComments() {

        if(params.id) {
            const response = await PostService.getCommentsUnderPostById(params.id);
            setAllComments(response);
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getPost(params.id);
        checkIfLikeExist();
        getAllComments();
    }, [])


    async function tapToLike() {

        if(!author_id) {
            alert("You are not authorized!");
            return;
        }
        
        if(isLike) {
            setIsLike(false);
            setSumLikes(sumLikes - 1);
            await LikeService.deleteLikeUnderPost(author_id, params.id)
        }
        else if(isDislike) {
            setIsDislike(false);
            setSumDislikes(sumDislikes - 1)
            setIsLike(true);
            setSumLikes(sumLikes + 1);
            await LikeService.deleteLikeUnderPost(author_id, params.id)
            await LikeService.createLikeUnderPost(author_id, params.id);
        }
        else {
            setIsLike(true);
            setSumLikes(sumLikes + 1);
            await LikeService.createLikeUnderPost(author_id, params.id);
        }

    }


    async function tapToDislike() {

        if(!author_id) {
            alert("You are not authorized!");
            return;
        }

        if(isDislike) {
            setIsDislike(false);
            setSumDislikes(sumDislikes - 1);
            await LikeService.deleteLikeUnderPost(author_id, params.id)
        }
        else if(isLike){
            setIsLike(false)
            setSumLikes(sumLikes - 1)
            setIsDislike(true)
            setSumDislikes(sumDislikes + 1);
            await LikeService.deleteLikeUnderPost(author_id, params.id)
            await LikeService.createDislikeUnderPost(author_id, params.id)
        }
        else {
            setIsDislike(true)
            setSumDislikes(sumDislikes + 1)
            await LikeService.createDislikeUnderPost(author_id, params.id)
        }
    }

    
    async function deletePost() {

        let isDelete = window.confirm("Do you want to delete the publication?")
            
        if(isDelete) {
            await PostService.deletePostById(params.id);
            setIsDelete(true);
        }
        return;
    }


    async function addComment() {

        if(newComment.length === 0) {
            alert("You can't add empty comment")
            return;
        }
        let comm = newComment;
        setNewComment("")
        await PostService.addCommentUnderPostById(params.id, author_id, comm);
        getAllComments();
    }


    async function deleteComment(id) {
        await PostService.deleteCommentById(id);
        getAllComments();
    }


    return (
        <div>
            {isDelete ? <Navigate to="/posts"/> : <div></div>}  
            {isUpdate ? <UpdatePage post={post}/> : 

            <div>
                { isLoading 
                    ? <Loader/>
                    : 
        
                    <div>
                        <div>
                        
                            <section className="flex-wrap">
                                <div className="row py-lg-5">
                                    <div className="text-center col-lg-6 col-md-8 mx-auto">
                                        <h1 className="fw-light">{post.title}</h1><br/>

                                        <h2 className="fw-light">by 
                                            <Link style={{ textDecoration: 'none', color:"white"}} to={`/authors/${post.author_id}`}>
                                                <strong> {post.author}</strong>
                                            </Link><br/><br/>
                                        </h2>

                                        <h3 className="fw-light">
                                            Publish date: {publish_date}<br/>
                                            Categories: {" "}

                                            { post.categories.length !== 0
                                                ? post.categories.map(category => 
                                                    <Category category={category} key={category.id}/>    
                                                )
                                                : <>None</>
                                            }
                                        </h3>

                                    </div>
                                </div>
                            </section>                
                            
                            <div className="container py-3">
                                <div className="card shadow-sm">

                                    <div className="container d-flex justify-content-between align-items-center">

                                        <div className="py-1 col-md-3 mb-0">
                                            <ul className="nav col-md-4 justify-content-center">
                                                    { isLike
                                                        ? <li style={{background:"yellow"}} className="nav-item"><a onClick={tapToLike} className="btn btn-sm btn-outline-secondary">👍: {sumLikes}</a></li>
                                                        : <li className="nav-item"><a onClick={tapToLike} className="btn btn-sm btn-outline-secondary">👍: {sumLikes}</a></li>
                                                    }

                                                    { isDislike
                                                        ? <li style={{background:"yellow"}} className="nav-item"><a onClick={tapToDislike} className="btn btn-sm btn-outline-secondary">👎: {sumDislikes}</a></li>
                                                        : <li className="nav-item"><a onClick={tapToDislike} className="btn btn-sm btn-outline-secondary">👎: {sumDislikes}</a></li>
                                                    }
                                            </ul>
                                        </div>

                                        <div className="nav col-md-4 justify-content-end">
                                            { getCookie("role") === "admin" && getCookie("id")
                                                ? 
                                                    <div>
                                                        <Link onClick={() => {setIsUpdate(true)}} className="btn btn-sm btn-outline-primary">Edit</Link>
                                                        <Link onClick={deletePost} className="btn btn-sm btn-outline-primary">Delete</Link>
                                                    </div>
                                                : String(post.author_id) === getCookie("id")
                                                    ?
                                                        <div>
                                                            <Link onClick={() => {setIsUpdate(true)}} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                                            <Link onClick={deletePost} className="btn btn-sm btn-outline-secondary">Delete</Link>
                                                        </div>
                                                    : <div></div>
                                            }
                                        </div>  
                                    </div>

                                    <div style={{background:"black", color: "white"}} className="px-4 py-5">
                                        {post.content}
                                    </div>

                                    {author_id
                                        ? 
                                            <div style={{background:"rgb(75, 75, 75)", color: "white", width: "100%"}} className="fw-light px-3 py-3 border">
                                                <textarea 
                                                    className="px-2 py-2"
                                                    style={{background:"black", color: "white", width: "100%"}}
                                                    placeholder="Write your comment..."
                                                    onChange={e => setNewComment(e.target.value)}
                                                    value={newComment}
                                                    >
                                                </textarea>
                                                
                                                {newComment.length === 0
                                                    ? <button disabled onClick={addComment} className="btn btn-outline-light me-2">Add comment</button>
                                                    : <button onClick={addComment} className="btn btn-outline-light me-2">Add comment</button>
                                                }

                                            </div>
                                        : <></>
                                    }

                                    <div>
                                        <Comments comments={allComments} deleteComment={deleteComment}/>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                }  
            </div>
            }
        </div>
    )

}

export default PublicationId;