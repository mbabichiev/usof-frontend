import React, { useEffect, useState } from "react";
import CategoryInList from "../components/CategoryInList";
import { Link, Navigate } from "react-router-dom";

import CategoryService from "../API/CategoryService";
import getCookie from "../scripts/getCookie";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";


const UpdatePage = (props) => {

    const [isLoading, setIsLoading] = useState(true)
    const [status, setStatus] = useState(props.post.status);
    const [content, setContent] = useState(props.post.content);
    const [allCategories, setCategories] = useState([]);
    const [arrCategories, setArrCategories] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    

    async function getAllCategories() {

        const response = await CategoryService.getAllCategories();
        setCategories(response.categories)

        let arr = [];

        for(var i = 0; props.post.categories[i]; i++) {
            for(var j = 0; response.categories[j]; j++) {
                if(props.post.categories[i].id === response.categories[j].id) {
                    arr.push(props.post.categories[i].id);
                }
            }
        }

        setIsLoading(false)
        setArrCategories(arr);
    }

    function checkIfCategoryInCategoriesById(id) {

        for(var i = 0; props.post.categories[i]; i++) {
            if(props.post.categories[i].id === id) {
                return true;
            } 
        }
        return false;
    }


    function addCategory(id) {
        setArrCategories([...arrCategories, id]);
    }

    function removeCategory(id) {
        setArrCategories(arrCategories.filter(c => c !== id));
    }


    async function updateData(e) {
        e.preventDefault();

        if(arrCategories.length === 0) {
            alert("You mush select at least one category!")
            return;
        }

        if(content.length === 0) {
            let isDelete = window.confirm("Do you want to delete the publication?")
            
            if(isDelete) {
                await PostService.deletePostById(props.post.id)
                setIsDelete(true);
            }
            return;
        }

        await PostService.updatePostById(
            props.post.id,
            arrCategories.join(','),
            status,
            content
            )
        
        setIsUpdate(true);
        
    }


    useEffect(() => {
        getAllCategories();
    }, [])


    return (
        <div>
            {isUpdate || isDelete ? <Navigate to={`/posts`}/> : <div></div>}
            { isLoading 
                ? <Loader/>
                : 
                
                <div>
                    <section className="flex-wrap">
                        <div className="row py-lg-5">
                            <div className="text-center col-lg-6 col-md-8 mx-auto">
                                <h1 className="fw-light">{props.post.title}</h1><br/>

                                    <h2 className="fw-light">by 
                                        <Link style={{ textDecoration: 'none', color:"white"}} to={`/authors/${props.post.author_id}`}>
                                            <strong> {props.post.author}</strong>
                                        </Link><br/><br/>
                                    </h2>

                                    { getCookie("role") === "admin"
                                        ? 
                                            <h4 className="fw-light">
                                                <div>
                                                    <label for="status">Status:</label>{" "}
                                                    <select className="btn me-2 btn-sm btn-outline-light" value={status} style={{size:"40", textAlign: "center"}} onChange={e => setStatus(e.target.value)} name="status" required>
                                                        <option value="inactive">Inactive</option>
                                                        <option value="active">Active</option>
                                                    </select>
                                                </div><br/>
                                            </h4>
                                        : <div></div>
                                    }

                                    <h3 className="fw-light">
                                        Categories: {" "}

                                        {allCategories.map(category => 
                                            <CategoryInList addCategory={addCategory} removeCategory={removeCategory} byPost={checkIfCategoryInCategoriesById(category.id)} category={category} />
                                        )}
                                        <br/><br/>
                                    </h3>

                                    { String(props.post.author_id) !== getCookie("id") || (String(props.post.author_id) === getCookie("id") && props.post.content.length > 1000)
                                        ? <button onClick={updateData} class="btn btn-warning">Save</button>
                                        : <div></div>
                                    }

                            </div>
                        </div>
                    </section>

                    <div class="container py-3">
                        <div>
                            { String(props.post.author_id) === getCookie("id")
                                ? 
                                    <div>
                                        <textarea onChange={e => setContent(e.target.value)} style={{width:"100%", background:"black", color: "white"}} class="border px-5 py-5">
                                            {props.post.content}
                                        </textarea> <br/>

                                        <div class="text-center col-lg-6 col-md-8 mx-auto">
                                            <button onClick={updateData} class="btn btn-warning">Save</button>
                                        </div>
                                    </div>
                                    
                                :   <div></div>
                            }
                        </div>
                    </div>
            </div>
            }  
        </div>
    )

}

export default UpdatePage;