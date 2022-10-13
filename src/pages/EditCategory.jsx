import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import CategoryService from "../API/CategoryService";
import getCookie from "../scripts/getCookie";
import Loader from "../components/UI/Loader/Loader";


const EditCategory = () => {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [isSaved, setIsSaved] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    async function getCategoryById(id) {
        const response = await CategoryService.getCategoryById(id);
        setIsLoading(false)
        setTitle(response.category.title);
        setContent(response.category.description);
    }


    async function save(e) {

        if(title.length < 4 || content.length < 10) {
            return;
        }

        e.preventDefault();

        let response = await CategoryService.updateCategoryById(params.id, title.toLocaleLowerCase(), content);

        if(response.length > 0) {
            alert(response);
            return;
        }

        setIsSaved(true);
    }


    useEffect(() => {
        getCategoryById(params.id)
    }, [])


    return (
        <div>
            { !getCookie("id") || getCookie("role") !== "admin" || isSaved
                ? <Navigate to={"/categories"} />
                : <></>
            }

            { isLoading 
                ? <Loader/>
                : 
                
                <div>

                    <form>
                        <section className="flex-wrap">
                            <div className="row py-lg-5">
                                <div className="col-lg-5 col-md-8 mx-auto">
                                    <h3 className="fw-light">Title:
                                        <input 
                                            style={{width:"100%", background:"black", color: "white"}}
                                            className="form-control"
                                            value={title}
                                            onChange={e => setTitle(e.target.value)} 
                                            type="text" 
                                            name="title" 
                                            minLength="4" required
                                        />
                                    </h3>

                                    <div><br/>
                                    <h4 className="fw-light">Description:</h4>

                                    <textarea
                                        required
                                        minLength="10"
                                        maxLength=""
                                        value={content}
                                        onChange={e => setContent(e.target.value)}
                                        style={{width:"100%", background:"black", color: "white"}}
                                        className="border px-2 py-2">
                                    </textarea> <br/><br/><br/>

                                    <div className="text-center col-lg-6 col-md-8 mx-auto">
                                        <button onClick={save} className="btn btn-warning">Save</button>
                                    </div>
                                </div>

                                </div>
                            </div>
                        </section>   

                    </form>
                </div>
            } 
        </div>
    )

}

export default EditCategory;