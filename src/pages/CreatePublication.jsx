import React, { useEffect, useState } from "react";
import getCookie from "../scripts/getCookie";
import { Navigate } from "react-router-dom";
import CategoryService from "../API/CategoryService";
import CategoryInList from "../components/CategoryInList";
import PostService from "../API/PostService";

const CreatePublication = () => {

    let auth = false;
    let author_id = getCookie("id")

    if(author_id) {
        auth = true
    }

    const [isAuth, setIsAuth] = useState(auth);
    const [isCreated, setIsCreated] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [allCategories, setCategories] = useState([]);
    const [arrChoosenCategories, setArrChoosenCategories] = useState([]);


    async function getAllCategories() {

        const response = await CategoryService.getAllCategories();
        setCategories(response.categories)
    }


    function addCategory(id) {
        setArrChoosenCategories([...arrChoosenCategories, id]);
    }

    function removeCategory(id) {
        setArrChoosenCategories(arrChoosenCategories.filter(c => c !== id));
    }

    useEffect(() => {
        getAllCategories();
    }, [])


    async function create(e) {

        if(!title || content.length < 20) {
            return;
        }

        e.preventDefault();

        if(arrChoosenCategories.length === 0) {
            
            alert("You mush select at least one category!")
            return;
        }
        
        setIsCreated(true);
        await PostService.createPost(author_id, title, arrChoosenCategories.join(','), content);

    }


    return (
        <div>
            {isAuth === false ? <Navigate to={"/"}/> : <div></div>}
            {isCreated ? <Navigate to={`/authors/${author_id}`}/> : <div></div>}
            <div>

                <form>
                    <section className="flex-wrap">
                        <div className="row py-lg-5">
                            <div className="col-lg-5 col-md-8 mx-auto">
                                <h3 className="fw-light">Title:
                                    <input 
                                        className="form-control"
                                        onChange={e => setTitle(e.target.value)} 
                                        type="text" 
                                        name="title" 
                                        minLength="1" required
                                    />
                                </h3>

                                <h3 className="fw-light">
                                    Categories: {" "}

                                    {allCategories.map(category => 
                                        <CategoryInList addCategory={addCategory} removeCategory={removeCategory} category={category} key={category.id}/>    
                                    )}
                                </h3>

                            </div>
                        </div>
                    </section>   


                    <div className="container py-3">
                        <div>
                            <div>
                                <textarea required minLength="20" maxLength="" onChange={e => setContent(e.target.value)} style={{width:"100%", background:"black", color: "white"}} className="border px-5 py-5">
                                </textarea> <br/><br/><br/>

                                <div className="text-center col-lg-6 col-md-8 mx-auto">
                                    <button onClick={create} className="btn btn-warning">Create publication</button>
                                </div>
                            </div>

                        </div>
                    </div>  
                </form>

            </div>
        </div>
    )

}

export default CreatePublication;