import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import CategoryService from "../API/CategoryService";
import PostService from "../API/PostService";
import PostItem from "../components/PostItem";
import getCookie from "../scripts/getCookie";
import sortPosts from "../scripts/sortPosts";
import Loader from "../components/UI/Loader/Loader";
import NoPublicationYet from "../components/NoPublication";

const CategoryId = () => {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState({})
    const [posts, setPosts] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);

    async function getCategory(id) {
        const response = await CategoryService.getCategoryById(id);
        setCategory(response.category);
    }


    async function getPostsByCategoryId(id) {
        const response = await PostService.getAllPostsByCategoryId(id);

        let arr = response
        if(arr.lenght !== 0) {
            setPosts(arr.sort((a, b) => b.publish_date - a.publish_date))
        }

        setIsLoading(false)
    }


    function sort(sortingType) {
        setPosts(sortPosts(posts, sortingType))
    }


    useEffect(() => {
        getCategory(params.id);
        getPostsByCategoryId(params.id);
    }, [])


    async function deleteCategory() {

        let isDelete = window.confirm("Do you want to delete the category?")

        if(isDelete) {
            await CategoryService.deleteCategoryById(params.id);
            setIsDeleted(true);
        }
    }


    let title = String(category.title);

    return (
        <div>
            { isDeleted
                ? <Navigate to={"/categories"} />
                : <></>
            }

            { isLoading 
                ? <Loader/>
                : 
                
                <div>
                    <section className="flex-wrap">
                        <div className="row text-center py-lg-5">
                            <div className="col-lg-6 col-md-8 mx-auto border-bottom">
                                <h1 className="fw-light">{title.charAt(0).toUpperCase() + title.slice(1)}</h1><br/>

                                <h2 className="fw-light">
                                    {category.description}
                                </h2>

                            </div>

                            { getCookie("role") === "admin" && getCookie("id")
                                ?
                                <div className="py-2">
                                    <Link to={`/categories/${params.id}/edit`} className="btn btn-warning">Edit</Link>{"  "}
                                    <button onClick={deleteCategory} className="btn btn-warning">Delete</button>
                                </div>
                                : <></>
                            }

                        </div>
                    </section>

                    {posts.length !== 0
                        ?
                        <div className="container d-flex justify-content-between align-items-center py-3">
                            <div className="py-1 col-md-3 mb-0">
                                <select className="btn btn-outline-light me-2" onChange={e => sort(e.target.value)} >
                                    <option value="popular">Most popular</option>
                                    <option value="oldest">Date added: oldest</option>
                                    <option value="newest" selected>Date added: newest</option>
                                </select>
                            </div>
                        </div>
                        : <></>
                    }
                    
                    <div className="container">
                        
                        {posts.length !== 0
                            ? posts.map(post => 
                            <PostItem post={post} key={post.id} />)
                            : <NoPublicationYet/>
                        }
                                
                    </div>
                </div>
            }  
        </div>
    )

}

export default CategoryId;