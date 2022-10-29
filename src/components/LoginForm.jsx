import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserService from '../API/UserService';
import saveRole from '../scripts/saveRole';
import OutlineButton from './UI/Button/OutlineButton/OutlineButton';
import YellowButton from './UI/Button/YellowButton/YellowButton';
import LightInput from './UI/Input/LightInput/LightInput';

const LoginForm = (props) => {

    const [isAuth, setIsAuth] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');


    async function submitLogin(e) {
        if (login.length < 4 || password.length < 6) {
            return;
        }
        e.preventDefault();

        const response = await UserService.login(login, password);

        if (response.status === 200) {

            const user = await UserService.getUserById(response.data.split('=')[1]);
            saveRole(user.role);
            document.cookie = response.data + ";path=/;";
            setIsAuth(true);
            props.updatePage();
        }
        else if (response.status === 400) {

            if (response.data === "Wrong password") {
                setPassword('');
            }
            alert(response.data);
        }
        else {
            alert("Oops, something went wrong...");
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