import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import CategoryService from "../API/CategoryService";
import PostService from "../API/PostService";
import UserService from "../API/UserService";
import Category from "../components/Category";
import getCookie from "../scripts/getCookie";
import Loader from "../components/UI/Loader/Loader";
import PublicationsArr from "../components/PublicationsArr";
import { usePagination } from "../scripts/usePagination";
import Select from "../components/UI/Select/Select";
import AvatarImg from "../components/UI/Img/AvatarImg/AvatarImg";

const AuthorId = () => {

    const limit = 5;
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [author, setAuthor] = useState({})
    const [favouriteCategory, setFavouriteCategory] = useState({});
    const [posts, setPosts] = useState([]);
    const [isLastPost, setIsLastPost] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [page, setPage] = useState(1);
    const [sortType, setSortType] = useState("new");
    const lastElement = useRef();


    async function getAuthorById() {
        const response = await UserService.getUserById(params.id);

        if (response.number_of_publications !== 0 && response.favourite_category !== null) {
            const resfavouriteCategory = await CategoryService.getCategoryById(response.favourite_category);
            setFavouriteCategory(resfavouriteCategory.category);
        }

        setAuthor(response);
    }


    async function getUserPostsById() {
        setIsLoading(true);
        const arr = await PostService.getPostsWithLimitByUserId(limit, page, sortType, params.id);
        setIsLoading(false);

        if (arr.length !== 0) {
            if (page === 1) {
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


    async function deleteAuthor() {
        if (window.confirm("Do you want to delete the author?")) {
            await UserService.deleteUserById(params.id);
            setIsDelete(true);
        }
    }


    useEffect(() => {
        getAuthorById()
    }, [params.id])


    useEffect(() => {
        getUserPostsById();
    }, [page, sortType, params.id])


    usePagination(lastElement, !isLastPost, isLoading, () => {
        setPage(page + 1)
    })


    function getPosts() {
        if (isLoading && posts.length === 0) {
            return <Loader />
        }
        return <PublicationsArr posts={posts} />
    }


    if (isDelete) {
        return <Navigate to={`/authors`} />
    }


    function getButtonsEditAndDelete() {
        return (
            <div className="btn-group">
                {(params.id === getCookie("id") || getCookie("role") === "admin") &&
                    <Link to={`/authors/${params.id}/edit`} className="btn btn-warning me-2">Edit profile</Link> 
                }
                {getCookie("role") === "admin" &&
                    <div onClick={deleteAuthor} className="btn btn-warning me-2">Delete</div>
                }
            </div>
        )
    }



    return (
        <div>

            <div className="py-5 px-5 row featurette">
                <div style={{ fontSize: "25px" }} className="fw-light col-md-7 order-md-2">
                    <strong>Full name: </strong>{author.full_name}<br />
                    <strong>Login: </strong>{author.login}<br />
                    <strong>Role: </strong>{author.role}<br />
                    <strong>Publications: </strong>{author.number_of_publications ? author.number_of_publications : 0}<br />
                    <strong>Rating: </strong>{author.rating}<br />

                    {author.number_of_publications !== 0 &&
                        <><strong>Favourite category: </strong><Category category={favouriteCategory} /><br /></>
                    }
                    <br />
                    <strong>Email: </strong>{author.email}<br />
                </div>

                <div className="text-center col-md-5 order-md-1">
                    <AvatarImg id={params.id} height={"300"} width={"300"} />
                    {getButtonsEditAndDelete()}
                </div>
            </div>


            <div className="col-lg-10 col-md-8 mx-auto border-bottom"></div>
            <br />


            <div className="container d-flex justify-content-between align-items-center py-3">
                <div className="py-1 col-md-3 mb-0">
                    {getCookie("id") === params.id &&
                        <Link to={"/posts/create"} className="btn btn-warning">Create publication</Link>
                    }
                </div>

                {posts.length !== 0 &&
                    <div className="nav col-md-4 justify-content-end">
                        <Select onChange={e => { setPage(1); setIsLastPost(false); setSortType(e.target.value) }} />
                    </div>
                }
            </div>


            <div className="container">
                {getPosts()}
                <div ref={lastElement} style={{ height: "30px" }}></div>
            </div>
        </div>
    )
}

export default AuthorId;