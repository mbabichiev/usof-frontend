import React, { useEffect, useState } from 'react';
import PostService from "../../../../API/PostService";


const PostImg = ({id}) => {

    const [photoSrc, setPostSrc] = useState('');

    async function getAndSetImgSrcById(id) {
        if(!id) {
            return setPostSrc('');
        }
        const src = await PostService.getPostPhotoById(id);
        setPostSrc(src)
    }


    useEffect(() => {
        getAndSetImgSrcById(id);
    }, [id])


    if(photoSrc !== '') {
        return (
            <div className="text-center mx-auto">
                <img className="border" height={"500"} src={photoSrc}/><br/><br/>
            </div>  
        )
    }
};

export default PostImg;
