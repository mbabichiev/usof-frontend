import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

import UserService from "../API/UserService";
import PostService from "../API/PostService";
import TopAuthors from "../components/TopAuthors";
import TopPublications from "../components/TopPublications";
import Quotes from "../components/Quotes";
import Loader from "../components/UI/Loader/Loader";
import getCookie from "../scripts/getCookie";


const Main = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [authors, setAuthors] = useState([])
    const [posts, setPosts] = useState([])


    async function getPopularUsers(numberTopUsers) {
        setAuthors(await UserService.getUsersWithLimitAndPage(numberTopUsers, 1));
    }


    async function getPopularPosts(numberTopPosts) {
        setPosts(await PostService.getPostWithLimit(numberTopPosts, 1, "popular"))
        setIsLoading(false);
    }


    useEffect(() => {
        getPopularUsers(5)
    }, [])

    useEffect(() => {
        getPopularPosts(5)
    }, [])


    if(isLoading) {
        return <Loader/>
    }

    return (  
        <div className="fw-light py-5 px-5 row">

            <div className="col-md-3 col">
                <p style={{fontSize: "30px"}}>Top authors</p>
                <TopAuthors authors={authors} />
            </div>

            <div className="col-md-4 col">
                <p style={{fontSize: "30px"}}>Top publications</p>
                <TopPublications posts={posts} />
            </div>

            <div className="col-md-5 col">
                <p style={{fontSize: "30px"}}>Start creating right now!</p>
                { getCookie("id")
                    ? <><Link to={"/posts/create"} className="btn btn-warning">Create publication</Link><br/><br/></>
                    : <></>
                }
                <Quotes/>
            </div>

        </div>
    )

}

export default Main;