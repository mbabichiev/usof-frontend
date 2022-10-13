import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../API/UserService";


const AuhorItem = (props) => {

    const [avatarSrc, setAvatarSrc] = useState('');


    async function getSrcForAvatarById(id) {
        const src = await UserService.getUserAvatarById(id);
        if(src) {
            setAvatarSrc(src);
        }
    }


    useEffect(() => {
        getSrcForAvatarById(props.author.id);
    }, [])

    
    return (
        <div className="col">
            <div className="card shadow-sm">

                <img style={{objectFit: "cover", objectPosition: "0 0"}} height={"310"} width={"100%"} src={avatarSrc}/>

                <div className="card-body">
                    {/* text */}
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/authors/${props.author.id}`} type="button" className="btn btn-sm btn-outline-secondary">{props.author.full_name}</Link>
                        <small className="text-muted">Rating: {props.author.rating}</small>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AuhorItem;