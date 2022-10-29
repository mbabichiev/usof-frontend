import React from "react";
import {Link} from "react-router-dom";

const Category = (props) => {

    return (
        <> 
        { props.bigsize 
            ? <Link to={`/categories/${props.category.id}`} className="btn me-2 py-3 px-3 btn-sm btn-outline-light">{props.category.title}</Link>    
            : <Link to={`/categories/${props.category.id}`} className="btn me-2 btn-sm btn-outline-light">{props.category.title}</Link>    
        }
        </>
    )
}

export default Category;