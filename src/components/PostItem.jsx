import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import LikeService from "../API/LikeService.js";

const getPartOfText = require("../scripts/getPartOfText.js");
const getCookie = require("../scripts/getCookie.js")

const PostItem = (props) => {

    const [isLike, setIsLike] = useState(false)
    const [isDislike, setIsDislike] = useState(false)
    const [sumLikes, setSumLikes] = useState(props.post.likes)
    const [sumDislikes, setSumDislikes] = useState(props.post.dislikes)

    let partOfContent = getPartOfText(props.post.content, 550, 4)
    let author_id = getCookie("id");



    async function checkIfLikeExist() {

        if(author_id) {

            let result = await LikeService.checkIfLikeExistUnderPost(author_id, props.post.id);

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

    useEffect(() => {
        checkIfLikeExist();
    }, [])

    async function tapToLike() {

        if(!author_id) {
            alert("You are not authorized!");
            return;
        }
        
        if(isLike) {
            setIsLike(false);
            setSumLikes(sumLikes - 1);
            await LikeService.deleteLikeUnderPost(author_id, props.post.id)
        }
        else if(isDislike) {
            setIsDislike(false);
            setSumDislikes(sumDislikes - 1)
            setIsLike(true);
            setSumLikes(sumLikes + 1);
            await LikeService.deleteLikeUnderPost(author_id, props.post.id)
            await LikeService.createLikeUnderPost(author_id, props.post.id);
        }
        else {
            setIsLike(true);
            setSumLikes(sumLikes + 1);
            await LikeService.createLikeUnderPost(author_id, props.post.id);
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
            await LikeService.deleteLikeUnderPost(author_id, props.post.id)
        }
        else if(isLike){
            setIsLike(false)
            setSumLikes(sumLikes - 1)
            setIsDislike(true)
            setSumDislikes(sumDislikes + 1);
            await LikeService.deleteLikeUnderPost(author_id, props.post.id)
            await LikeService.createDislikeUnderPost(author_id, props.post.id)
        }
        else {
            setIsDislike(true)
            setSumDislikes(sumDislikes + 1)
            await LikeService.createDislikeUnderPost(author_id, props.post.id)
        }
    }

    return (
        <div>
            <div className="py-3">
                    <div className="card shadow-sm">

                        <Link style={{ textDecoration: 'none'}} to={`/posts/${props.post.id}`}>
                            <div style={{background:"black", color: "white"}} className="text-center px-4 py-5">
                                <p>{props.post.title}</p>
                                {partOfContent}
                            </div>
                        </Link>


                        <div className="container d-flex justify-content-between align-items-center py-3">

                            <div className="col-md-4 mb-0">
                                <Link to={`/authors/${props.post.author_id}`} className="btn btn-sm btn-outline-secondary">{props.post.author}</Link>
                            </div>

                            <div className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
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

                            { props.post.categories[0]
                                ?
                                <div className="nav col-md-4 justify-content-end">
                                    <Link to={`/categories/${props.post.categories[0].id}`} className="btn btn-sm btn-outline-secondary">{props.post.categories[0].title}</Link>
                                </div>
                                : 
                                <div className="nav col-md-4 justify-content-end">
                                    <text className="btn btn-sm btn-outline-secondary">None</text>
                                </div>
                            }
                            

                        </div>

                    </div>
            </div>
        </div>
    )

}

export default PostItem;