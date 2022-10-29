import React, { useState } from "react";
import axios from "axios";
import LightInput from "./UI/Input/LightInput/LightInput";
import OutlineButton from "./UI/Button/OutlineButton/OutlineButton";
import { Navigate } from "react-router-dom";


const EnterToken = (props) => {

    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')
    const [isAuth, setIsAuth] = useState(false);


    async function loginWithToken(e) {

        if(!token || !password) {
            return;
        }

        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/api/auth/password-reset/${token}`, {
                password: password
            })
            if(response.status === 202) {
                document.cookie = response.data + ";path=/;";
                setIsAuth(true);
            }
        }
        catch (err) {
            if(err.response.status === 400) {
                alert(err.response.data);
            }
        }
    }


    if(isAuth) {
        return <Navigate to="/"/>
    }

    return (
            <div className="container col-xl-10 col-xxl-8 px-4 py-5">
                <div className="row align-items-center g-lg-5 py-5">
                    <div className="col-md-10 mx-auto col-lg-6 text-center">
                        <form style={{background:"rgba(105, 105, 107, 0.5)"}} className="p-4 p-md-5 border fw-light rounded-3">

                            <p>
                                Enter the token we sent to your email <strong>{props.email}</strong> and new password.
                            </p>


                            Token<br/>
                            <LightInput
                                style={{textAlign: "center"}}
                                onChange={e => setToken(e.target.value)}
                                placeholder="00xxx000-0x0x-00x0-x0x0-000000000x0x" 
                                type="text" 
                                name="token" 
                                minLength="4"
                            />
                            <br/>


                            New password<br/>
                            <LightInput
                                style={{textAlign: "center"}}
                                onChange={e => setPassword(e.target.value)}
                                type="password" 
                                name="password" 
                                minLength="4"
                            />
                            <br/>

                            <OutlineButton onClick={loginWithToken}>Save</OutlineButton>
                            
                        </form>
                    </div>
                </div>
            </div>
    )

}

export default EnterToken;