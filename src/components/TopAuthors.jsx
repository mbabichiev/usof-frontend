import React from "react";
import AuthorTopItem from "../components/AuthorTopItem";


const TopAuthors = ({authors}) => {

    return (
        <div>
            {authors.map(author => 
                <AuthorTopItem author={author} key={author.id} />    
            )}
        </div>
    )
}

export default TopAuthors;