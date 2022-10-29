import React, { useEffect, useState } from 'react';
import UserService from '../../../../API/UserService';


const AvatarImg = ({id, ...props}) => {

    const [avatarSrc, setAvatarSrc] = useState('');


    async function getAndSetImgSrcById(id) {
        if(!id) {
            return setAvatarSrc('');
        }
        const src = await UserService.getUserAvatarById(id);
        setAvatarSrc(src)
    }


    useEffect(() => {
        getAndSetImgSrcById(id);
    }, [id])


    if(avatarSrc !== '') {
        return (
            <div className="text-center mx-auto">
                <img className="border" style={{objectFit: "cover", objectPosition: "0 0"}} src={avatarSrc} {...props}/><br/><br/>
            </div>  
        )
    }
};

export default AvatarImg;
