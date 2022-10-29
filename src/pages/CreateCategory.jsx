import React, { useState } from "react";
import getCookie from "../scripts/getCookie";
import { Navigate } from "react-router-dom";
import CategoryService from "../API/CategoryService";
import DarkInput from "../components/UI/Input/DarkInput/DarkInput";
import Textarea from "../components/UI/Textarea/Textarea";
import YellowButton from "../components/UI/Button/YellowButton/YellowButton";


const CreateCategory = () => {

    const [isCreated, setIsCreated] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    async function create(e) {
        if (title.length < 4 || content.length < 10) {
            return;
        }

        e.preventDefault();

        let response = await CategoryService.createCategory(title.toLocaleLowerCase(), content);
        if (response.length > 0) {
            return alert(response);
        }

        setIsCreated(true);
    }


    if (!getCookie("id") || getCookie("role") !== "admin" || isCreated) {
        return <Navigate to={"/categories"} />
    }


    return (
        <form className="flex-wrap row py-lg-5">
            <div className="col-lg-5 col-md-8 mx-auto">

                <h3 className="fw-light">Title:</h3>
                <DarkInput
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    minLength="4"
                />
                <br />
                
                <h4 className="fw-light">Description:</h4>
                <Textarea
                    minLength="10"
                    onChange={e => setContent(e.target.value)}
                    rows={5}
                />
                <br /><br /><br />

                <div className="text-center col-lg-6 col-md-8 mx-auto">
                    <YellowButton onClick={create}>Create category</YellowButton>
                </div>
            </div>
        </form>
    )
}

export default CreateCategory;