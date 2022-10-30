import React from 'react';


const Select = ({isComment, ...props}) => {

    return (
        <select {...props} className="btn btn-outline-light me-2">
            {isComment 
                ? <option value="popular" selected>Most popular</option>
                : <option value="popular">Most popular</option>
            }  
            <option value="old">Date added: oldest</option>
            {isComment 
                ? <option value="new">Date added: newest</option>
                : <option value="new" selected>Date added: newest</option>
            } 
            
        </select>
    )

};

export default Select;
