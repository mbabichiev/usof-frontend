import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import getCookie from "../scripts/getCookie";
import saveRole from "../scripts/saveRole"
import UserService from "../API/UserService";


const Register = ({updatePage}) => {

    
    const [isRegister, setIsRegister] = useState(false);
    const [login, setLogin] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');


    async function saveUser(e) {

        if(!login || !firstname || !lastname || !password || !confirmPassword || !email) {
            return;
        }

        e.preventDefault();
        if(password !== confirmPassword) {
            setPassword('')
            setConfirmPassword('')
            alert("Password is not the same as confirm password, please write again.");

            return;
        }

        const response = await UserService.register(login, firstname, lastname, password, email);

        if(response.status === 201) {
            document.cookie = response.data + ";path=/;"
            saveRole("user");
            updatePage();
            setIsRegister(true);
        }
        else if(response.status === 400) {
            alert(response.data)

        }
    }


    return (
        <div>

            { getCookie("id") || isRegister
                ? <Navigate to={"/"}/>
                :

                <div className="container col-xl-10 col-xxl-8 px-4 py-5">

                    <div className="row align-items-center g-lg-5">
                        <div className="col-lg-5 text-center text-lg-start">
                            <h1 className="display-4 fw-bold lh-1 mb-3">Lib2Lib</h1>
                            <p className="col-lg-10 fs-4">Publish your stories, poems, books, quotes, keep diaries, share with others.
                            Let your creative way start with small steps on <strong>L2L</strong>.</p>
                        </div>

                        <div className="col-md-10 mx-auto col-lg-6 text-center">
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
                                <button onClick={saveUser} className="btn btn-warning">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    )

}

export default Register;