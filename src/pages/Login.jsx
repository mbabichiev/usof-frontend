import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import ForgetPasswordPage from "../components/ForgetPasswordPage";
import { Navigate } from "react-router-dom";
import getCookie from "../scripts/getCookie";


const Login = (props) => {

    const [isForget, setIsForget] = useState(false)
    
    function setForget(value) {
        setIsForget(value)
    }

    if(getCookie("id")) {
        return <Navigate to={"/"}/>
    }

    if(isForget) {
        return <ForgetPasswordPage/>
    }

    return (
        <LoginForm updatePage={props.updatePage} setForget={setForget}/>
    )
}

export default Login;