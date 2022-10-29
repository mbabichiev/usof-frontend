import React from 'react';


const Dislike = ({isDislike, sum, ...props}) => {

    let style = {}

    if(isDislike) {
        style = {background:"yellow"}
    }

    return (
        <li style={style} className="nav-item">
            <a {...props} className="btn btn-sm btn-outline-secondary">
                👎: {sum}
            </a>
        </li>
    )

};

export default Dislike;
