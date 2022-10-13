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

    return (
        <div>
            { getCookie("id") 
                ? <Navigate to={"/"}/>
                :

                <div>
                    { isForget
                    ? <ForgetPasswordPage/> 
                    : <LoginForm updatePage={props.updatePage} setForget={setForget}/>
                    }
                </div>
            }
        </div>
    )

}

export default Login;