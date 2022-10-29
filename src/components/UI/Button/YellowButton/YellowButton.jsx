import React from 'react';


const YellowButton = ({children, ...props}) => {

    return (
        <button {...props} className="btn btn-warning">
            {children}
        </button>
    )
};

export default YellowButton;
