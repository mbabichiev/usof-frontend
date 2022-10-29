import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import CategoryService from "../API/CategoryService";
import PostService from "../API/PostService";
import getCookie from "../scripts/getCookie";
import Loader from "../components/UI/Loader/Loader";
import PublicationsArr from "../components/PublicationsArr";
import { usePagination } from "../scripts/usePagination";
import Select from "../components/UI/Select/Select";
import YellowButton from "../components/UI/Button/YellowButton/YellowButton"

const CategoryId = () => {

    const limit = 5;
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState({})
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [sortType, setSortType] = useState("new");
    const [isDeleted, setIsDeleted] = useState(false);
    const [isLastPost, setIsLastPost] = useState(false);
    const lastElement = useRef();


    async function getCategoryById(id) {
        const response = await CategoryService.getCategoryById(id);
        setCategory(response.category);
    }


    async function deleteCategory() {
        if (window.confirm("Do you want to delete the category?")) {
            await CategoryService.deleteCategoryById(params.id);
            setIsDeleted(true);
        }
    }


    async function getPostsByCategoryId(id) {
        setIsLoading(true);
        const arr = await PostService.getAllPostsByCategoryIdWithLimit(limit, page, sortType, id);
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


    usePagination(lastElement, !isLastPost, isLoading, () => {
        setPage(page + 1)
    })


    useEffect(() => {
        getCategoryById(params.id);
    }, [])


    useEffect(() => {
        getPostsByCategoryId(params.id);
    }, [page, sortType])


    let title = String(category.title);


    if (isDeleted) {
        return <Navigate to={"/categories"} />
    }

    function getPosts() {
        if (isLoading && posts.length === 0) {
            return <Loader />
        }
        return <PublicationsArr posts={posts} />
    }


    function getSelect() {
        if (posts.length !== 0) {
            return (
                <div className="container d-flex justify-content-between align-items-center py-3">
                    <div className="py-1 col-md-3 mb-0">
                        <Select onChange={e => { setPage(1); setIsLastPost(false); setSortType(e.target.value) }} />
                    </div>
                </div>
            )
        }
    }


    function getButtonsEditAndDeleteIfAdmin() {
        if (getCookie("role") === "admin" && getCookie("id")) {
            return (
                <div className="py-2">
                    <Link to={`/categories/${params.id}/edit`} className="btn btn-warning">Edit</Link>{"  "}
                    <YellowButton onClick={deleteCategory}>Delete</YellowButton>
                </div>
            )
        }
    }


    return (
        <div>
            <section className="flex-wrap">
                <div className="row text-center py-lg-5">

                    <div className="col-lg-6 col-md-8 mx-auto border-bottom">
                        {category.description &&
                            <>
                                <h1 className="fw-light">{title.charAt(0).toUpperCase() + title.slice(1)}</h1><br />
                                <h2 className="fw-light">{category.description}</h2>
                            </>
                        }
                    </div>

                    {getButtonsEditAndDeleteIfAdmin()}

                </div>
            </section>

            {getSelect()}

            <div className="container">
                {getPosts()}
                <div ref={lastElement} style={{ height: "10px" }}></div>
            </div>

        </div>
    )

}

export default CategoryId;