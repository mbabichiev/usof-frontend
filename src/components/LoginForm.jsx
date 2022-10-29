import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import saveRole from '../scripts/saveRole';
import OutlineButton from './UI/Button/OutlineButton/OutlineButton';
import YellowButton from './UI/Button/YellowButton/YellowButton';
import LightInput from './UI/Input/LightInput/LightInput';

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
                saveRole(responseUser.data.user.role);
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


    if(isAuth) {
        return <Navigate to="/"/>
    }


    return (
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-md-10 mx-auto col-lg-5 text-center">
                    <form style={{background:"rgba(105, 105, 107, 0.5)", textAlign: "center"}} className="p-4 p-md-5 border rounded-3">

                        Login<br/>
                        <LightInput 
                            style={{textAlign: "center"}}
                            onChange={e => setLogin(e.target.value)}
                            type="text"
                            name="login" 
                            minLength="4"
                        />
                        <br/>

                        Password<br/>
                        <LightInput 
                            style={{textAlign: "center"}}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            minLength="6"
                        />
                        <br/><br/>


                        <div style={{float: "left"}}>
                            <YellowButton onClick={submitLogin}>Login</YellowButton>
                        </div>

                        <div style={{float: "right"}}>
                            <OutlineButton onClick={forgetPassword}>Forget password?</OutlineButton>
                        </div>

                        <br/>
                                
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;