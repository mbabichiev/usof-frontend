import axios from "axios";
import React, { useState } from "react";


const EnterEmail = (props) => {

    const [email, setEmail] = useState('')
    const [isSending, setIsSending] = useState(false)

    async function sendTokenOnEmail(e) {

        if(!email) {
            return;
        }

        setIsSending(true);
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/auth/password-reset", {
                email: email
            })

            if(response.status === 200) {
                props.isSendToken(true);
                props.changeEmail(email);
            }
        }
        catch (err) {
            if(err.response.status === 400) {
                alert(err.response.data);
            }
        }
        finally {
            setIsSending(false);
        }
    }

    return (
        <div>
            <div className="container col-xl-10 col-xxl-8 px-4 py-5">

                <div className="row align-items-center g-lg-5 py-5">

                    <div className="col-md-10 mx-auto col-lg-5 text-center">
                        <form style={{background:"rgba(105, 105, 107, 0.5)"}} className="p-4 p-md-5 border rounded-3">

                            <p>
                                Enter the email address you registered your account with.<br/>You will receive an email containing a password reset token.
                            </p>

                            <div>
                                <input className="form-control"
                                style={{textAlign: "center"}} onChange={e => setEmail(e.target.value)} placeholder="example@gmail.com" type="email" name="email" minLength="4" required/><br/>
                            </div>

                            <button onClick={sendTokenOnEmail} className="btn btn-outline-light">Send</button>
                            
                        </form>
                        { isSending
                            ? <p><br/>Sending the token on email {email}...</p>
                            : <div></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EnterEmail;