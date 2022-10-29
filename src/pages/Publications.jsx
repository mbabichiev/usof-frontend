import React, { useEffect, useRef, useState } from "react";
import {Link} from "react-router-dom";
import getCookie from "../scripts/getCookie";
import {usePagination} from "../scripts/usePagination";
import Loader from "../components/UI/Loader/Loader";
import PostService from "../API/PostService";
import Select from "../components/UI/Select/Select";
import PublicationsArr from "../components/PublicationsArr";

const Publications = () => {
    
    const limit = 5;
    const [isLoading, setIsLoading] = useState(true);
    const [isLastPost, setIsLastPost] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [sortType, setSortType] = useState("new");
    const lastElement = useRef();


    async function getActivePosts() {

        setIsLoading(true);
        const arr = await PostService.getPostWithLimit(limit, page, sortType);
        setIsLoading(false);

        if(arr.length !== 0) {
            if(page === 1) {
                setPosts(arr)
            }
            else {
                setPosts([...posts, ...arr])
            }
        }
        else {
            setIsLastPost(true);
        }
    }


    usePagination(lastElement, !isLastPost, isLoading, () => {
        setPage(page + 1)
    })


    useEffect(() => {
        getActivePosts();
    }, [page, sortType])


    function getPosts() {
        if(isLoading && posts.length === 0) {
            return <Loader/>
        }
        return <PublicationsArr posts={posts}/>
    }


    return (
        <div>
            <section className="flex-wrap">
                <div className="row py-lg-5 text-center">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Publications</h1>
                    </div>
                </div>
            </section>
            
            <div className="container d-flex justify-content-between align-items-center py-3">
                <div className="py-1 col-md-3 mb-0">
                    {getCookie("id") && 
                        <Link to={"/posts/create"} className="btn btn-warning">Create publication</Link>
                    }  
                </div>
                {posts.length !== 0 &&
                    <div className="nav col-md-4 justify-content-end">
                        <Select onChange={e => {setPage(1);setIsLastPost(false);setSortType(e.target.value)}}/>
                    </div>
                }
            </div>
                
            <div className="container">
                {getPosts()}
                <div ref={lastElement} style={{height:"10px"}}></div>
            </div>   
        </div>
    )

}

export default Publications;