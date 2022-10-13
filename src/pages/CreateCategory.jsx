import React, { useState } from "react";
import getCookie from "../scripts/getCookie";
import { Navigate } from "react-router-dom";
import CategoryService from "../API/CategoryService";


const CreateCategory = () => {

    const [isCreated, setIsCreated] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    async function create(e) {

        if(title.length < 4 || content.length < 10) {
            return;
        }

        e.preventDefault();

        let response = await CategoryService.createCategory(title.toLocaleLowerCase(), content);

        if(response.length > 0) {
            alert(response);
            return;
        }

        setIsCreated(true);
    }


    return (
        <div>
            { !getCookie("id") || getCookie("role") !== "admin" || isCreated
                ? <Navigate to={"/categories"} />
                : <></>
            }
            
            <div>

                <form>
                    <section className="flex-wrap">
                        <div className="row py-lg-5">
                            <div className="col-lg-5 col-md-8 mx-auto">
                                <h3 className="fw-light">Title:
                                    <input 
                                        style={{width:"100%", background:"black", color: "white"}}
                                        className="form-control"
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
                                    onChange={e => setContent(e.target.value)}
                                    style={{width:"100%", background:"black", color: "white"}}
                                    className="border px-2 py-2">
                                </textarea> <br/><br/><br/>

                                <div className="text-center col-lg-6 col-md-8 mx-auto">
                                    <button onClick={create} className="btn btn-warning">Create category</button>
                                </div>
                            </div>

                            </div>
                        </div>
                    </section>   

                </form>

            </div>

        </div>
    )

}

export default CreateCategory;