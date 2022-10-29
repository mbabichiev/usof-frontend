import React, { useEffect, useState } from "react";
import CategoryInList from "../components/CategoryInList";
import { Link, Navigate } from "react-router-dom";

import CategoryService from "../API/CategoryService";
import getCookie from "../scripts/getCookie";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import DarkInput from "../components/UI/Input/DarkInput/DarkInput";
import YellowButton from "../components/UI/Button/YellowButton/YellowButton";
import Textarea from "../components/UI/Textarea/Textarea";


const EditPublication = (props) => {

    const [isLoading, setIsLoading] = useState(true)
    const [status, setStatus] = useState(props.post.status);
    const [title, setTitle] = useState(props.post.title);
    const [content, setContent] = useState(props.post.content);
    const [allCategories, setCategories] = useState([]);
    const [arrCategories, setArrCategories] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [postPhotoSrc, setPostPhotoSrc] = useState('');
    const [photo, setPhoto] = useState('');
    const [isDeletePhoto, setIsDeletePhoto] = useState(false);


    async function getAllCategories() {
        const response = await CategoryService.getAllCategories();
        setCategories(response.categories)

        let arr = [];

        for (var i = 0; props.post.categories[i]; i++) {
            for (var j = 0; response.categories[j]; j++) {
                if (props.post.categories[i].id === response.categories[j].id) {
                    arr.push(props.post.categories[i].id);
                }
            }
        }
        setIsLoading(false)
        setArrCategories(arr);
    }


    async function getPhotoUrl(id) {
        const url = await PostService.getPostPhotoById(id);
        setPostPhotoSrc(url);
    }


    function checkIfCategoryInCategoriesById(id) {
        for (var i = 0; props.post.categories[i]; i++) {
            if (props.post.categories[i].id === id) {
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


    function uploadPhoto(e) {
        let file = e.target.files[0];
        let fileFormat = file.name.split('.').pop();

        if (fileFormat !== "jpg" && fileFormat !== "png" && fileFormat !== "jpeg") {
            alert("Photo should be only .jpg, .png or .jpeg");
            return;
        }

        const url = window.URL.createObjectURL(file)
        setPostPhotoSrc(url)
        setPhoto(file);
        setIsDeletePhoto(false);
    }


    async function updateData(e) {
        e.preventDefault();

        if (arrCategories.length === 0) {
            return alert("You mush select at least one category!")
        }

        if (content.length === 0) {
            if (window.confirm("Do you want to delete the publication?")) {
                await PostService.deletePostById(props.post.id)
                setIsDelete(true);
            }
            return;
        }

        await PostService.updatePostById(
            props.post.id,
            title,
            arrCategories.join(','),
            status,
            content
        )

        if (isDeletePhoto) {
            await PostService.deletePostPhotoById(props.post.id);
        }
        else {
            await PostService.uploadPostPhoto(props.post.id, photo);
        }
        setIsUpdate(true);
    }


    function deletePhoto() {
        setPostPhotoSrc('');
        setIsDeletePhoto(true);
    }


    useEffect(() => {
        getAllCategories();
    }, [])


    useEffect(() => {
        getPhotoUrl(props.post.id);
    }, [])


    if (isUpdate || isDelete) {
        return <Navigate to={`/posts`} />
    }


    if (isLoading) {
        return <Loader />
    }


    function getAuthorLink() {
        return (
            <h2 className="fw-light">by {" "}
                <Link style={{ color: "white" }} to={`/authors/${props.post.author_id}`}>
                    <strong>{props.post.author}</strong>
                </Link><br /><br />
            </h2>
        )
    }


    function getTitle() {
        if (String(props.post.author_id) === getCookie("id")) {
            return (
                <>
                    <h3 className="fw-light">Title:</h3>
                    <DarkInput
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        name="title"
                        minLength="4"
                    /><br />
                </>
            )
        }
    }


    function getStatus() {
        if (getCookie("role") === "admin") {
            return (
                <h4 className="fw-light">
                    Status: {" "}
                    <select className="btn me-2 btn-sm btn-outline-light" value={status} style={{ size: "40", textAlign: "center" }} onChange={e => setStatus(e.target.value)} name="status">
                        <option value="inactive">Inactive</option>
                        <option value="active">Active</option>
                    </select>
                    <br /><br />
                </h4>
            )
        }
    }


    function getCategories() {
        return (
            <h3 className="fw-light">
                Categories: {" "}
                {allCategories.map(category =>
                    <CategoryInList addCategory={addCategory} removeCategory={removeCategory} byPost={checkIfCategoryInCategoriesById(category.id)} category={category} />
                )}
                <br /><br />
            </h3>
        )
    }


    function getButtonsForPhoto() {
        if (postPhotoSrc !== '') {
            return (
                <div className="mx-auto">
                    <img className="border" height={"500"} src={postPhotoSrc} /><br /><br />
                    <label htmlFor="upload" style={{ cursor: "pointer" }} className="btn btn-warning me-2">Upload</label>
                    <YellowButton onClick={deletePhoto}>Delete</YellowButton>
                    <input style={{ display: "none" }} id="upload" type="file" onChange={e => uploadPhoto(e)} />
                </div>
            )
        }
        else if (String(props.post.author_id) === getCookie("id")) {
            return (
                <div>
                    <label htmlFor="upload" style={{ cursor: "pointer" }} className="btn btn-warning me-2">Add photo</label>
                    <input style={{ display: "none" }} id="upload" type="file" onChange={e => uploadPhoto(e)} />
                </div>
            )
        }
    }


    function getContent() {
        if (String(props.post.author_id) === getCookie("id")) {
            return (
                <Textarea onChange={e => setContent(e.target.value)} rows={content.length / 90} >
                    {props.post.content}
                </Textarea>
            )
        }
    }


    return (
        <div>

            <section className="flex-wrap">
                <div className="row py-lg-5">
                    <div className="text-center col-lg-6 col-md-8 mx-auto">
                        {getAuthorLink()}
                        {getTitle()}
                        {getStatus()}
                        {getCategories()}
                    </div>
                </div>
            </section>

            <div className="text-center mx-auto">
                {getButtonsForPhoto()}
            </div>

            <div class="container py-3">
                {getContent()}
                <br />
                <div class="text-center col-lg-6 col-md-8 mx-auto">
                    <YellowButton onClick={updateData}>Save</YellowButton>
                </div>
            </div>
        </div>
    )

}

export default EditPublication;