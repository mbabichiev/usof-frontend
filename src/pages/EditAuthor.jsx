import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import getCookie from "../scripts/getCookie";
import UserService from "../API/UserService";
import Loader from "../components/UI/Loader/Loader";
import DarkInput from "../components/UI/Input/DarkInput/DarkInput";
import YellowButton from "../components/UI/Button/YellowButton/YellowButton";

const EditAuthor = () => {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [avatarSrc, setAvatarSrc] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isUpdated, setIsUpdated] = useState(false)
    const [isDeleteAvatar, setIsDeleteAvatar] = useState(false);


    async function getAuthorById(id) {
        const response = await UserService.getUserById(id);
        const src = await UserService.getUserAvatarById(id);

        let fullname = String(response.full_name).split(' ');
        setIsLoading(false)
        setFirstname(fullname[0]);
        setLastname(fullname[1]);
        setLogin(response.login);
        setEmail(response.email);
        setAvatarSrc(src);
    }


    async function save(e) {
        if (firstname.length < 1 || lastname.length < 1 || login.length < 4 || !email) {
            return;
        }
        e.preventDefault();

        await UserService.updateUserById(params.id, firstname, lastname, login, email);

        if (avatar) {
            await UserService.uploadAvatar(params.id, avatar);
        }
        else if (isDeleteAvatar) {
            await UserService.deleteUserAvatarById(params.id);
        }

        setIsUpdated(true);
    }


    function avatarUploader(e) {
        let file = e.target.files[0];
        let fileFormat = file.name.split('.').pop();

        if (fileFormat !== "jpg" && fileFormat !== "png" && fileFormat !== "jpeg") {
            alert("Avatar should be only .jpg, .png or .jpeg");
            return;
        }

        const url = window.URL.createObjectURL(file)
        setAvatarSrc(url)
        setAvatar(file);
        setIsDeleteAvatar(false);
    }


    async function setDefaultAvatar() {
        setAvatarSrc(await UserService.getDefaultAvatar());
        setIsDeleteAvatar(true);
        setAvatar('');
    }


    useEffect(() => {
        getAuthorById(params.id)
    }, [])


    if (params.id !== getCookie("id") && getCookie("role") !== "admin" || isUpdated) {
        return <Navigate to={`/authors/${params.id}`} />
    }


    if (isLoading) {
        return <Loader />
    }


    function getButtonsUploadDelete() {
        return (
            <>
                <img className="border" style={{ objectFit: "cover", objectPosition: "0 0" }} height={"300"} width={"300"} src={avatarSrc} /><br /><br />
                <label htmlFor="upload" style={{ cursor: "pointer" }} className="btn btn-warning me-2">Upload</label>
                <YellowButton onClick={setDefaultAvatar}>Delete</YellowButton>
                <input style={{ display: "none" }} id="upload" type="file" onChange={e => avatarUploader(e)} />
            </>
        )
    }


    return (
        <div>

            <div className="py-5 px-5 row featurette">
                <div style={{ fontSize: "25px" }} className="fw-light col-md-6 order-md-2">

                    <div className="btn-group">
                        <div>
                            Firstname:
                            <DarkInput
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                                type="text"
                                name="firstname"
                                minLength="1"
                                style={{ width: "95%", background: "black", color: "white" }}
                            />
                        </div>
                        <div>
                            Lastname:
                            <DarkInput
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                                type="text"
                                name="lastname"
                                minLength="1"
                                style={{ width: "95%", background: "black", color: "white" }}
                            />
                        </div>
                    </div>
                    <br />

                    Login:
                    <DarkInput
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        type="text"
                        name="login"
                        minLength="4"
                        style={{ width: "56%", background: "black", color: "white" }}
                    />
                    <br />

                    Email:
                    <DarkInput
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="text"
                        name="email"
                        style={{ width: "56%", background: "black", color: "white" }}
                    />
                    <br />
                </div>

                <div className="text-center col-md-5 order-md-1">
                    {getButtonsUploadDelete()}
                </div>

            </div>

            <div className="col-lg-10 col-md-8 mx-auto border-bottom">
            </div>

            <br />
            <div className="text-center">
                <YellowButton onClick={save}>Save</YellowButton>
            </div>
        </div>
    )

}

export default EditAuthor;