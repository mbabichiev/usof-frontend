import React, { useEffect, useState } from 'react';
import LikeService from "../API/LikeService";
import Like from './UI/Like/Like';
import Dislike from './UI/Dislike/Dislike';
import getCookie from '../scripts/getCookie';

const PostReactions = ({post_id, numberOfLikes, numberOfDislikes}) => {

    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);
    const [sumLikes, setSumLikes] = useState(0);
    const [sumDislikes, setSumDislikes] = useState(0);

    let my_id = getCookie("id");


    async function checkIfLikeExist() {

        setSumLikes(numberOfLikes);
        setSumDislikes(numberOfDislikes);

        if(!my_id) {
            return;
        }

        let result = await LikeService.checkIfLikeExistUnderPost(my_id, post_id);

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


    async function tapToLike() {
        if(!my_id) {
            alert("You are not authorized!");
            return;
        }
        
        if(isLike) {
            setIsLike(false);
            setSumLikes(sumLikes - 1);
            await LikeService.deleteLikeUnderPost(my_id, post_id)
        }
        else if(isDislike) {
            setIsDislike(false);
            setSumDislikes(sumDislikes - 1)
            setIsLike(true);
            setSumLikes(sumLikes + 1);
            await LikeService.deleteLikeUnderPost(my_id, post_id)
            await LikeService.createLikeUnderPost(my_id, post_id);
        }
        else {
            setIsLike(true);
            setSumLikes(sumLikes + 1);
            await LikeService.createLikeUnderPost(my_id, post_id);
        }
    }


    async function tapToDislike() {
        if(!my_id) {
            alert("You are not authorized!");
            return;
        }

        if(isDislike) {
            setIsDislike(false);
            setSumDislikes(sumDislikes - 1);
            await LikeService.deleteLikeUnderPost(my_id, post_id)
        }
        else if(isLike){
            setIsLike(false)
            setSumLikes(sumLikes - 1)
            setIsDislike(true)
            setSumDislikes(sumDislikes + 1);
            await LikeService.deleteLikeUnderPost(my_id, post_id)
            await LikeService.createDislikeUnderPost(my_id, post_id)
        }
        else {
            setIsDislike(true)
            setSumDislikes(sumDislikes + 1)
            await LikeService.createDislikeUnderPost(my_id, post_id)
        }
    }


    useEffect(() => {
        checkIfLikeExist();
    }, [post_id, numberOfLikes, numberOfDislikes])
    

    return (
        <ul className="nav col-md-4 justify-content-center">
            <Like isLike={isLike} onClick={tapToLike} sum={sumLikes}/>
            <Dislike isDislike={isDislike} onClick={tapToDislike} sum={sumDislikes}/>
        </ul>
    )
   
};

export default PostReactions;
