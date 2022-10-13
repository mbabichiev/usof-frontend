import React from "react";
import AuthorItem from "./AuthorItem"

const ArrayAuthors = (props) => {
    
    return (

        <div className="container album py-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-md-4 g-3">
                {props.authors.map(author => 
                    <AuthorItem author={author} key={author.id} />    
                )}
            </div>
        </div>
    )

}

export default ArrayAuthors;