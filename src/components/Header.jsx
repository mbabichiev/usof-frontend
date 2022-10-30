import React, { useState } from "react";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import SearchService from "../API/SearchService";
import OutlineButton from "./UI/Button/OutlineButton/OutlineButton";

const getCookie = require("../scripts/getCookie.js")

const Header = () => {

    const [isAuth, setAuth] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [foundAuthors, setFoundAuthors] = useState([]);
    const [foundPosts, setFoundPosts] = useState([]);
 
    let id = getCookie("id")
    if (id && !isAuth) {
        setAuth(true)
    }

    const iconStyle = {
        color: "white",
        fontSize: "30px"
    };


    function logout() {
        document.cookie = "id=0;max-age=0;path=/"
        document.cookie = "role=user;max-age=0;path=/"
        setAuth(false);
    }


    async function getSearchData() {

        if(searchText.length === 0) {
            return
        }

        let authors = await SearchService.getUsersBySearch(searchText);
        let posts = await SearchService.getPostsBySearch(searchText);

        setFoundAuthors(authors);
        setFoundPosts(posts);
    }


    function drawSearchAuthors() {
        return (
            <div className="col-md-5 col">
                <p style={{fontSize: "20px"}}>Authors:</p>
                {foundAuthors.length === 0
                    ? <>Authors not found</>
                    : <>{foundAuthors.map(author => 
                            <><Link class="px-2 text-white" to={"/authors/" + author.id}>{author.full_name}</Link><br/></>
                        )}</>
                }
            </div>
        )
    }

    function drawSearchPosts() {
        return (
            <div className="col-md-5 col">
                <p style={{fontSize: "20px"}}>Publications:</p>
                {foundPosts.length === 0
                    ? <>Publications not found</>
                    : <>{foundPosts.map(post => 
                            <><Link class="px-2 text-white" to={"/posts/" + post.id}>{post.title}</Link><br/></>
                        )}</>
                }
            </div>
        )
    }


    function drawSearchData() {
        if(searchText.length === 0) {
            return
        }

        return (
            <div style={{ background: "rgba(105, 105, 107, 0.5)" }} className="fw-light py-5 px-5 row">
                {drawSearchAuthors()}
                {drawSearchPosts()}
            </div>
        )

    }


    useEffect(() => {
        getSearchData();
    }, [searchText])


    return (
        <div>
            <header style={{ background: "black" }} className="p-3 text-bg-dark">
                <div className="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <a class="fw-light border rounded-2 d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                                <div style={iconStyle} color="white">L2L</div>
                            </a>
                        </Link>

                        <div class="col-md-7 text-center">
                            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">

                                {isAuth === true &&
                                    <li><Link to={'/authors/' + id} style={{ textDecoration: 'none' }}><a class="nav-link px-2 text-secondary">Home</a></Link></li>
                                }

                                <li><Link to="/authors" style={{ textDecoration: 'none' }}><a class="nav-link px-2 text-white">Authors</a></Link></li>
                                <li><Link to="/posts" style={{ textDecoration: 'none' }}><a class="nav-link px-2 text-white">Publications</a></Link></li>
                                <li><Link to="/categories" style={{ textDecoration: 'none' }}><a class="nav-link px-2 text-white">Categories</a></Link></li>
                                <li><Link to="/about" style={{ textDecoration: 'none' }}><a class="nav-link px-2 text-white">About</a></Link></li>

                            </ul>
                        </div>

                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" onChange={e => setSearchText(e.target.value)} class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"></input>
                        </form>

                        {id
                            ?
                            <div class="text-end">
                                <OutlineButton onClick={logout}>Logout</OutlineButton>
                            </div>
                            :
                            <div class="text-end">
                                <Link to="/auth/login" class="btn btn-outline-light me-2">Login</Link>
                                <Link to="/auth/register" class="btn btn-warning">Registration</Link>
                            </div>
                        }
                    </div>
                </div>
            </header>

            {drawSearchData()}

        </div>
    )
}

export default Header;
