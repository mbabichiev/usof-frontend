import React from 'react';


const Textarea = (props) => {

    return (
        <textarea {...props} className="px-2 py-2 border fw-light" style={{background:"black", color: "white", width: "100%"}}>
        </textarea>
    )

};

export default Textarea;
