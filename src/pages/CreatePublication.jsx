import React, { useEffect, useState } from "react";
import getCookie from "../scripts/getCookie";
import { Navigate } from "react-router-dom";
import CategoryService from "../API/CategoryService";
import CategoryInList from "../components/CategoryInList";
import PostService from "../API/PostService";
import Textarea from "../components/UI/Textarea/Textarea";
import YellowButton from "../components/UI/Button/YellowButton/YellowButton";
import DarkInput from "../components/UI/Input/DarkInput/DarkInput";

const CreatePublication = () => {

    let author_id = getCookie("id")
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
        if (!title || content.length < 20) {
            return;
        }

        e.preventDefault();

        if (arrChoosenCategories.length === 0) {
            return alert("You mush select at least one category!")
        }

        setIsCreated(true);
        await PostService.createPost(author_id, title, arrChoosenCategories.join(','), content);
    }


    if (!author_id) {
        return <Navigate to={"/"} />
    }

    if (isCreated) {
        return <Navigate to={`/authors/${author_id}`} />
    }

    return (
        <form>
            <section className="flex-wrap row col-lg-5 col-md-8 mx-auto py-lg-5">
                <h3 className="fw-light">Title:
                    <DarkInput
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        name="title"
                        minLength="1"
                    />
                </h3>

                <h3 className="fw-light">
                    Categories: {" "}
                    {allCategories.map(category =>
                        <CategoryInList addCategory={addCategory} removeCategory={removeCategory} category={category} key={category.id} />
                    )}
                </h3>
            </section>

            <div className="container py-3">
                <Textarea
                    minLength="20"
                    rows={10}
                    onChange={e => setContent(e.target.value)}
                />
                <br /><br /><br />

                <div className="text-center col-lg-6 col-md-8 mx-auto">
                    <YellowButton onClick={create}>Create publication</YellowButton>
                </div>
            </div>
            
        </form>
    )
}

export default CreatePublication;