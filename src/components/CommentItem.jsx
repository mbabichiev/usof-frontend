import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LikeService from "../API/LikeService";
import getCookie from "../scripts/getCookie";


const CommentItem = (props) => {

    const [isLike, setIsLike] = useState(false)
    const [isDislike, setIsDislike] = useState(false)
    const [sumLikes, setSumLikes] = useState(props.comment.likes)
    const [sumDislikes, setSumDislikes] = useState(props.comment.dislikes)

    let author_id = getCookie("id");

    async function checkIfLikeExist() {

        if(author_id) {

            let result = await LikeService.checkIfLikeExistUnderComment(author_id, props.comment.id);

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
            await LikeService.deleteLikeUnderComment(author_id, props.comment.id)
        }
        else if(isDislike) {
            setIsDislike(false);
            setSumDislikes(sumDislikes - 1)
            setIsLike(true);
            setSumLikes(sumLikes + 1);
            await LikeService.deleteLikeUnderComment(author_id, props.comment.id)
            await LikeService.createLikeUnderComment(author_id, props.comment.id);
        }
        else {
            setIsLike(true);
            setSumLikes(sumLikes + 1);
            await LikeService.createLikeUnderComment(author_id, props.comment.id);
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
            await LikeService.deleteLikeUnderComment(author_id, props.comment.id)
        }
        else if(isLike){
            setIsLike(false)
            setSumLikes(sumLikes - 1)
            setIsDislike(true)
            setSumDislikes(sumDislikes + 1);
            await LikeService.deleteLikeUnderComment(author_id, props.comment.id)
            await LikeService.createDislikeUnderComment(author_id, props.comment.id)
        }
        else {
            setIsDislike(true)
            setSumDislikes(sumDislikes + 1)
            await LikeService.createDislikeUnderComment(author_id, props.comment.id)
        }
    }


    function deleteComment() {

        var isConfirm = window.confirm("Do you want to delete the comment?");

        if(isConfirm) {
            props.deleteComment(props.comment.id);
        }

    }


    let publish_date = new Date(props.comment.publish_date).toLocaleString();

    return (
        <div style={{background:"rgb(75, 75, 75)", color: "white", width: "100%"}} className="fw-light px-3 py-2 border">
            <div className="py-2">
                <strong><Link style={{ textDecoration: 'none', color:"white"}} to={"/authors/" + props.comment.author_id}>{props.comment.author}</Link></strong>, {publish_date} <br/>
            </div>

            <h6>{props.comment.content}</h6>

            <div className="d-flex justify-content-between align-items-center">
                <div className="py-1 col-md-3 mb-0">
                    <ul  className="nav col-md-4 justify-content-center">
                        { isLike
                            ? <li style={{background:"yellow"}} className="nav-item"><text onClick={tapToLike} className="btn btn-sm btn-outline-secondary">👍: {sumLikes}</text></li>
                            : <li className="nav-item"><text onClick={tapToLike} style={{color: "white"}} className="btn border btn-sm btn-outline-secondary">👍: {sumLikes}</text></li>
                        }

                        { isDislike
                            ? <li style={{background:"yellow"}} className="nav-item"><text onClick={tapToDislike} className="btn btn-sm btn-outline-secondary">👎: {sumDislikes}</text></li>
                            : <li className="nav-item"><text onClick={tapToDislike} style={{color: "white"}} className="btn border btn-sm btn-outline-secondary">👎: {sumDislikes}</text></li>
                        }
                    </ul>
                </div>

                { getCookie("id") && getCookie("role") === "admin"
                    ?
                        <div className="nav col-md-4 justify-content-end">
                            <text onClick={deleteComment} className="btn border btn-sm btn-outline-primary">Delete</text>
                        </div>
                    : String(props.comment.author_id) === String(author_id)
                        ? 
                            <div className="nav col-md-4 justify-content-end">
                                <text onClick={deleteComment} className="btn btn-outline-light">Delete</text>
                            </div>
                        : <></>

                }
            </div>
        </div>
    )
}

export default CommentItem;