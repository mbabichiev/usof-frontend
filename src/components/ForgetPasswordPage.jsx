import React, { useState } from "react";
import EnterEmail from "./enterEmail";
import EnterToken from "./enterToken";


const ForgetPasswordPage = (props) => {

    const [sendToken, setSendToken] = useState(false);
    const [email, setEmail] = useState('')

    function isSendToken(value) {
        setSendToken(value);
    } 

    function changeEmail(new_email) {
        setEmail(new_email)
    }

    return (
        <div>
            { sendToken
                ? <EnterToken email={email} funcToChangeStatusLogin={props.funcToChangeStatusLogin}/>
                : <EnterEmail changeEmail={changeEmail} isSendToken={isSendToken} />
            }
        </div>
    )

}

export default ForgetPasswordPage;