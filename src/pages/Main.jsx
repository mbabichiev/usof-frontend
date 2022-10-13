import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

import UserService from "../API/UserService";
import PostService from "../API/PostService";
import sortUsers from "../scripts/sortUsers";
import sortPosts from "../scripts/sortPosts";
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

        const response = await UserService.getAllUsers()
        
        let top_users = [];
        let sortedUsers = sortUsers(response);
        
        for(var i = 0; sortedUsers[i] && i < numberTopUsers; i++) {
            top_users.push(sortedUsers[i])
        }

        setAuthors(top_users);

    }


    async function getPopularPosts(numberTopPosts) {
        const response = await PostService.getAllPosts()

        let top_posts = [];
        let sortedPosts = sortPosts(response, "popular");
        
        for(var i = 0; sortedPosts[i] && i < numberTopPosts; i++) {
            top_posts.push(sortedPosts[i])
        }

        setIsLoading(false);
        setPosts(top_posts)
    }


    useEffect(() => {
        getPopularUsers(5)
    }, [])

    useEffect(() => {
        getPopularPosts(5)
    }, [])
    

    return (
        <div>

        { isLoading 
            ? <Loader/>
            :
            

            <div className="fw-light py-5 px-5 row">

                <div  className="col-md-3 col">
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
                        ? <Link to={"/posts/create"} className="btn btn-warning">Create publication</Link>
                        : <></>
                    }  
                    <br/><br/>
                    <Quotes/>
                </div>
            </div>
        }
        </div>
    )

}

export default Main;