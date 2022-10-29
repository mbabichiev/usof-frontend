import React from 'react';


const Like = ({isLike, sum, ...props}) => {

    let style = {}

    if(isLike) {
        style = {background:"yellow"}
    }

    return (
        <li style={style} className="nav-item">
            <a {...props} className="btn btn-sm btn-outline-secondary">
                👍: {sum}
            </a>
        </li>
    )

};

export default Like;
