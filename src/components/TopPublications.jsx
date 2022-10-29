import React from "react";
import PostTopItem from "../components/PostTopItem";


const TopPublications = ({posts}) => {

    return (
        <div>
            {posts.map(posts => 
                <PostTopItem post={posts} key={posts.id} />    
            )}
        </div>
    )
}

export default TopPublications;