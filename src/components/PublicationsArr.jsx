import React from 'react';
import NoPublicationYet from './NoPublication';
import PostItem from './PostItem';


const PublicationsArr = ({posts}) => {

    function getPosts() {
        if(posts.length === 0) {
            return <NoPublicationYet/>
        }

        return posts.map(post => 
            <PostItem post={post} key={post.id}/>  
        )
    }


    return (
        <>
            {getPosts()}
        </>
    )

};

export default PublicationsArr;
