import React, { useEffect, useState } from "react";
import UserService from "../API/UserService";
import { Link } from "react-router-dom";

const AuthorTopItem = ({author}) => {

    const [avatarSrc, setAvatarSrc] = useState('');

    async function getSrcForAvatarById(id) {
        const src = await UserService.getUserAvatarById(id);
        if(src) {
            setAvatarSrc(src);
        }
    }


    useEffect(() => {
        getSrcForAvatarById(author.id);
    }, [])


    return (

        <div style={{background:"black", color: "white", size:"50%"}} className="px-3 py-3 border row featurette" >

            <div style={{fontSize: "20px"}} className="fw-light col-md-7 py-3 order-md-2">
                <Link style={{ color:"white"}} to={`/authors/${author.id}`} >{author.full_name}</Link><br/>
                <text><strong>Rating: </strong>{author.rating}</text><br/>
            </div>

            <div className="col-md-5 order-md-1">
                <img className="border" style={{objectFit: "cover", objectPosition: "0 0"}} height={"90"} width={"90"} src={avatarSrc}/>
            </div>

        </div>
    )
}

export default AuthorTopItem;