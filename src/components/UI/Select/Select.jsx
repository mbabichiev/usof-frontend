import React from 'react';


const Select = (props) => {

    return (
        <select {...props} className="btn btn-outline-light me-2">
            <option value="popular">Most popular</option>
            <option value="old">Date added: oldest</option>
            <option value="new" selected>Date added: newest</option>
        </select>
    )

};

export default Select;
