import React from 'react';


const OutlineButton = ({children, ...props}) => {

    return (
        <button {...props} className="btn btn-outline-light">
            {children}
        </button>
    )
};

export default OutlineButton;
