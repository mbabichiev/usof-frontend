import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import CategoryService from "../API/CategoryService";
import PostService from "../API/PostService";
import UserService from "../API/UserService";
import Category from "../components/Category";
import PostItem from "../components/PostItem";
import getCookie from "../scripts/getCookie";
import sortPosts from "../scripts/sortPosts";
import Loader from "../components/UI/Loader/Loader";
import NoPublicationYet from "../components/NoPublication";

const AuthorId = () => {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [avatarSrc, setAvatarSrc] = useState('');
    const [author, setAuthor] = useState({})
    const [favouriteCategory, setFavouriteCategory] = useState({});
    const [posts, setPosts] = useState([])
    const [isDelete, setIsDelete] = useState(false)


    async function getAuthorById(id) {
        const response = await UserService.getUserById(id);
        const src = await UserService.getUserAvatarById(id);

        if(response.number_of_publications !== 0 && response.favourite_category !== null) {
            const resfavouriteCategory = await CategoryService.getCategoryById(response.favourite_category);
            setFavouriteCategory(resfavouriteCategory.category);
        }

        const allPosts = await PostService.getAllPostsByUserId(params.id);
        let arr = allPosts
        setPosts(arr.sort((a, b) => b.publish_date - a.publish_date))

        setIsLoading(false);
        setAuthor(response);
        setAvatarSrc(src);
    }


    async function deleteAuthor() {
        let isConfirm = window.confirm("Do you want to delete the author?")
        if(isConfirm) {
            await UserService.deleteUserById(params.id);
            setIsDelete(true);
        }
    }


    function sort(sortingType) {
        setPosts(sortPosts(posts, sortingType))
    }


    useEffect(() => {
        getAuthorById(params.id)
    }, [params.id])

    
    return (
        <div>
            { isDelete 
                ? <Navigate to={`/authors`} /> 
                : <></>

            }
            { isLoading
                ? <Loader/>
                : 
            <div>
            
                <div className="py-5 px-5 row featurette">
                    
                    <div style={{fontSize: "25px"}} className="fw-light col-md-7 order-md-2">
                        <text><strong>Full name: </strong>{author.full_name}</text><br/>
                        <text><strong>Login: </strong>{author.login}</text><br/>
                        <text><strong>Role: </strong>{author.role}</text><br/>
                        <text><strong>Publications: </strong>{author.number_of_publications ? author.number_of_publications : 0}</text><br/>
                        <text><strong>Rating: </strong>{author.rating}</text><br/>
                        
                        {author.number_of_publications !== 0
                            ? <text><strong>Favourite category: </strong> <Category category={favouriteCategory}/> <br/></text>
                            : <></>
                        }
                        <br/>
                        <text><strong>Email: </strong>{author.email}</text><br/>


                    </div>

                    <div className="text-center col-md-5 order-md-1">
                        <img className="border" style={{objectFit: "cover", objectPosition: "0 0"}} height={"300"} width={"300"} src={avatarSrc}/><br/><br/>
                        
                        <div className="btn-group">
                            { params.id === getCookie("id") || getCookie("role") === "admin"
                                ? <Link to={`/authors/${params.id}/edit`} className="btn btn-warning me-2">Edit profile</Link>
                                :   <></>
                            }

                            { getCookie("role") === "admin"
                                ? <text onClick={deleteAuthor} className="btn btn-warning me-2">Delete</text>
                                :   <></>
                            }
                        </div>
                        
                    </div>

                </div>

                <div className="col-lg-10 col-md-8 mx-auto border-bottom">

                </div>
                <br/>

                <div className="container d-flex justify-content-between align-items-center py-3">

                    <div className="py-1 col-md-3 mb-0">
                        { getCookie("id") === params.id
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
                    
                    {posts.length !== 0 
                        ? posts.map(post => 
                            <PostItem post={post} key={post.id} />    
                        )
                        : <NoPublicationYet/>   
                    }
                            
                </div>

            </div>
            }

            

        </div>
    )
}

export default AuthorId;