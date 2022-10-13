import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import getCookie from "../scripts/getCookie";

const CreateForAdmin = (props) => {

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

        if(login.length < 4 || !firstname || !lastname || password.length < 6 || confirmPassword.length < 6 || !email || !role) {
            return;
        }

        if(password !== confirmPassword) {

            e.preventDefault();

            setPassword('')
            setConfirmPassword('')

            alert("Password is not the same as confirm password, please write again.");
            return;
        }

        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/users", {
                login: login,
                firstname: firstname,
                lastname: lastname,
                password: password,
                email: email,
                role: role
            })

            if(response.status === 201) {
                setOldLogin(login);
                setOldRole(role);
                setIsCreated(true);
            }
        }
        catch (err) {
            if(err.response.status === 400) {
                alert(err.response.data);
            }
        }
    }

    return (
        <div>

            { !getCookie("id") || getCookie("role") !== "admin"
                ? <Navigate to={'/authors'} />
                : <></>
            }

            <div className="container col-xl-10 col-xxl-8 px-4 py-5">

                <div className="row align-items-center g-lg-5">

                    <div className="col-md-10 mx-auto col-lg-6 text-center">

                        { isCreated 
                            ? <p>{oldLogin} ({oldRole}) successfully created. </p>
                            : <div></div>
                        }

                        <form style={{background:"rgba(105, 105, 107, 0.5)"}} className="p-4 p-md-4 border rounded-2">
                            <div>
                                <label for="login">Login</label><br/>
                                <input className="form-control"
                                style={{textAlign: "center"}} type="text" name="login" onChange={e => setLogin(e.target.value)} minLength="4" required/><br/>
                            </div>

                            <div>
                                <div>
                                    <label for="firstname">First name</label><br/>
                                    <input className="form-control"
                                    style={{textAlign: "center"}} type="text" name="firstname" onChange={e => setFirstName(e.target.value)} minlength="1" required/><br/>
                                </div>

                                <div>
                                    <label for="lastname">Last name</label><br/>
                                    <input className="form-control"
                                    style={{textAlign: "center"}} type="text" name="lastname" onChange={e => setLastName(e.target.value)} minlength="1" required/><br/>
                                </div>
                            </div>

                            <div>
                                <label for="password">Password</label><br/>
                                <input className="form-control"
                                style={{textAlign: "center"}} type="password" value={password} onChange={e => setPassword(e.target.value)} minlength="6" required/><br/>
                            </div>

                            <div>
                                <label for="confirmpass">Confirm Password</label><br/>
                                <input className="form-control"
                                style={{textAlign: "center"}} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} minlength="6" required/><br/>
                            </div>

                            <div>
                                <label for="email">Email</label><br/>
                                <input className="form-control"
                                style={{textAlign: "center"}} type="email" name="email" onChange={e => setEmail(e.target.value)} required/><br/>
                            </div>

                            <div>
                                <label for="role">Role</label><br/>
                                <select className="form-control" style={{textAlign: "center"}} onChange={e => setRole(e.target.value)} name="role" required>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <br/>
                            <button onClick={saveUser} className="btn btn-warning">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CreateForAdmin;