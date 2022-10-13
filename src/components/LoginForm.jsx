import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import saveRole from '../scripts/saveRole';

const LoginForm = (props) => {

    const [isAuth, setIsAuth] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');


    async function submitLogin(e) {

        if(!login || !password) {
            return;
        }

        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                login: login,
                password: password
            })

            if(response.status === 200) {

                const responseUser = await axios.get(`http://localhost:8080/api/users/${response.data.split('=')[1]}`)
                
                if(String(responseUser.data.user.role) === "admin") {
                    saveRole("admin")
                }
                else if(String(responseUser.data.user.role) === "user") {
                    saveRole("user")
                }
                document.cookie = response.data + ";path=/;";
                setIsAuth(true);
                props.updatePage();
            }
        }
        catch (err) {
            if(err.response.status === 400) {
                if(err.response.data === "Wrong password") {
                    setPassword('');
                }
                alert(err.response.data);
            }
        }

    }


    function forgetPassword(e) {
        e.preventDefault();
        props.setForget(true)
    }

    return (
        <div>
            { isAuth
                ? <Navigate to="/"/>
                :

                <div className="container col-xl-10 col-xxl-8 px-4 py-5">

                    <div className="row align-items-center g-lg-5 py-5">

                        <div className="col-md-10 mx-auto col-lg-5 text-center">
                            <form style={{background:"rgba(105, 105, 107, 0.5)"}} className="p-4 p-md-5 border rounded-3">

                                <div>
                                    <label for="login">Login</label><br/>
                                    <input className="form-control"
                                    style={{textAlign: "center"}} onChange={e => setLogin(e.target.value)} type="text" name="login" minLength="4" required/><br/>
                                </div>

                                <div>
                                    <label for="password">Password</label><br/>
                                    <input className="form-control"
                                    style={{textAlign: "center"}} value={password} onChange={e => setPassword(e.target.value)} type="password" minlength="6" required/><br/>
                                </div>
                                <br/>

                                <div style={{float: "left"}}>
                                    <button onClick={submitLogin} className="btn btn-warning">Login</button>
                                </div>

                                <div style={{float: "right"}}>
                                    <button onClick={forgetPassword} className="btn btn-outline-light">Forget password?</button>
                                </div>
                                <br/>
                                <br/>
                                
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default LoginForm;