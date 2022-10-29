import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import CategoryService from "../API/CategoryService";
import getCookie from "../scripts/getCookie";
import Loader from "../components/UI/Loader/Loader";
import DarkInput from "../components/UI/Input/DarkInput/DarkInput";
import Textarea from "../components/UI/Textarea/Textarea";
import YellowButton from "../components/UI/Button/YellowButton/YellowButton";


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
        if (title.length < 4 || content.length < 10) {
            return;
        }

        e.preventDefault();

        let response = await CategoryService.updateCategoryById(params.id, title.toLocaleLowerCase(), content);

        if (response.length > 0) {
            alert(response);
            return;
        }

        setIsSaved(true);
    }


    useEffect(() => {
        getCategoryById(params.id)
    }, [])


    if (!getCookie("id") || getCookie("role") !== "admin" || isSaved) {
        return <Navigate to={"/categories"} />
    }


    if (isLoading) {
        return <Loader />
    }


    return (
        <form>
            <section className="flex-wrap">
                <div className="row py-lg-5">
                    <div className="col-lg-5 col-md-8 mx-auto">

                        <h3 className="fw-light">Title:</h3>
                        <DarkInput
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            type="text"
                            name="title"
                            minLength="4"
                        />
                        <br />


                        <h4 className="fw-light">Description:</h4>

                        <Textarea 
                            minLength="10"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={5}
                        />
                        <br /><br /><br />

                        <div className="text-center col-lg-6 col-md-8 mx-auto">
                            <YellowButton onClick={save}>Save</YellowButton>
                        </div>

                    </div>
                </div>
            </section>

        </form>
    )

}

export default EditCategory;