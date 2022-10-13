import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import PostItem from "../components/PostItem";
import {Link} from "react-router-dom";
import getCookie from "../scripts/getCookie";
import sortPosts from "../scripts/sortPosts";
import {usePagination} from "../scripts/usePagination";
import Loader from "../components/UI/Loader/Loader";
import NoPublicationYet from "../components/NoPublication";

const Publications = () => {
    
    let limit = 5;
    const [isLoading, setIsLoading] = useState(true);
    const [isLastPost, setIsLastPost] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const lastElement = useRef();


    async function getActivePosts() {

        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:8080/api/posts?limit=${limit}&page=${page}`);
            setIsLoading(false);

            let arr = response.data.posts
            if(arr.length !== 0) {
                setPosts([...posts, ...arr])
            }
            else {
                setIsLastPost(true);
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    function sort(sortingType) {
        setPosts(sortPosts(posts, sortingType))
    }


    usePagination(lastElement, isLastPost, isLoading, () => {
        setPage(page + 1)
    })


    useEffect(() => {
        getActivePosts();
    }, [page])


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
                    { getCookie("id")
                        ? <Link to={"/posts/create"} className="btn btn-warning">Create publication</Link>
                        : <></>
                    }  
                </div>
                { posts.length !== 0
                    ?
                        <div className="nav col-md-4 justify-content-end">
                            <select className="btn btn-outline-light me-2" onChange={e => sort(e.target.value)} >
                                <option value="popular">Most popular</option>
                                <option value="oldest">Date added: oldest</option>
                                <option value="newest" selected>Date added: newest</option>
                            </select>
                        </div>
                    : <></>
                }
            </div>
                

            <div className="container">
                
                { posts.length !== 0 
                    ? 
                        posts.map(post => 
                            <PostItem post={post} key={post.id} />    
                        )
                    :   !isLoading ? <NoPublicationYet/> : <></>
                }

                { isLoading
                    ? <Loader/>
                    : <></>
                }

                <div ref={lastElement} style={{height:"10px"}}>

                </div>           
            </div>
        </div>
    )

}

export default Publications;