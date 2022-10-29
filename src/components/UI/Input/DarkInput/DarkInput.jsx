import React from 'react';

const DarkInput = (props) => {
    return <input className="form-control fw-light" style={{ width: "100%", background: "black", color: "white" }} required {...props}/>
};

export default DarkInput;
