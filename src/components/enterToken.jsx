import React, { useState } from "react";
import axios from "axios";


const EnterToken = (props) => {

    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')

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
                document.cookie = response.data;
                props.funcToChangeStatusLogin(false);
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
            <div className="container col-xl-10 col-xxl-8 px-4 py-5">

                <div className="row align-items-center g-lg-5 py-5">

                    <div className="col-md-10 mx-auto col-lg-6 text-center">
                        <form style={{background:"rgba(105, 105, 107, 0.5)"}} className="p-4 p-md-5 border rounded-3">

                            <p>
                                Enter the token we sent to your email {props.email} and new password.
                            </p>

                            <div>
                                <label for="token">Token</label><br/>
                                <input className="form-control"
                                style={{textAlign: "center"}} onChange={e => setToken(e.target.value)} placeholder="00xxx000-0x0x-00x0-x0x0-000000000x0x" type="text" name="token" minLength="4" required/><br/>
                            </div>

                            <div>
                                <label for="password">New password</label><br/>
                                <input className="form-control"
                                style={{textAlign: "center"}} onChange={e => setPassword(e.target.value)} type="password" name="password" minLength="4" required/><br/>
                            </div>

                            <button onClick={loginWithToken} className="btn btn-outline-light">Save</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EnterToken;