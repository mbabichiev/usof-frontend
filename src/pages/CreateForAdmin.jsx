import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import UserService from "../API/UserService";
import YellowButton from "../components/UI/Button/YellowButton/YellowButton";
import LightInput from "../components/UI/Input/LightInput/LightInput";
import getCookie from "../scripts/getCookie";

const CreateForAdmin = () => {

    const [login, setLogin] = useState('');
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('user')
    const [oldLogin, setOldLogin] = useState('');
    const [oldRole, setOldRole] = useState('')
    const [isCreated, setIsCreated] = useState(false);


    async function saveUser(e) {
        if (login.length < 4 || !firstname || !lastname || password.length < 6 ||
            confirmPassword.length < 6 || email.length < 6 || email.indexOf("@") === -1 || !role) {
            return;
        }

        e.preventDefault();
        if (password !== confirmPassword) {
            setPassword('')
            setConfirmPassword('')

            return alert("Password is not the same as confirm password, please write again.");
        }

        const response = await UserService.createUser(login, firstname, lastname, password, email, role);

        if (response.status === 201) {
            setOldLogin(login);
            setOldRole(role);
            setIsCreated(true);
        }
        else if (response.status === 400) {
            alert(response.data);
        }
        else {
            alert("Oops, something went wrong...");
        }
    }


    if (!getCookie("id") || getCookie("role") !== "admin") {
        return <Navigate to={'/authors'} />
    }


    return (
        <div className="container col-xxl-8 px-4 py-5">
            <div className="mx-auto col-lg-6 text-center">

                {isCreated &&
                    <p>{oldLogin} ({oldRole}) successfully created.</p>
                }

                <form style={{ background: "rgba(105, 105, 107, 0.5)" }} className="p-4 p-md-4 border rounded-2">

                    Login<br />
                    <LightInput
                        type="text"
                        name="login"
                        onChange={e => setLogin(e.target.value)}
                        minLength="4"
                        style={{ width: "100%" }}
                    />
                    <br />

                    <div className="btn-group">
                        <div>
                            First name<br />
                            <LightInput
                                type="text"
                                name="firstname"
                                onChange={e => setFirstName(e.target.value)}
                                minLength="1"
                            />
                            <br />
                        </div>

                        <div>
                            Last name<br />
                            <LightInput
                                type="text"
                                name="lastname"
                                onChange={e => setLastName(e.target.value)}
                                minLength="1"
                            />
                        </div>
                    </div>

                    Password<br />
                    <LightInput
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        minlength="6"
                        style={{ width: "100%" }}
                    />
                    <br />

                    Confirm Password<br />
                    <LightInput
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        minlength="6"
                        style={{ width: "100%" }}
                    />
                    <br />

                    Email<br />
                    <LightInput
                        type="email"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                        minlength="6"
                        style={{ width: "100%" }}
                    />
                    <br />

                    Role<br />
                    <select className="form-control" style={{ textAlign: "center" }} onChange={e => setRole(e.target.value)} name="role">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <br />

                    <YellowButton onClick={saveUser}>Register</YellowButton>
                </form>
            </div>
        </div>
    )

}

export default CreateForAdmin;