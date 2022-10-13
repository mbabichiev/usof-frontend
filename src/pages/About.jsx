import React from "react";


const About = () => {

    return (
        <div>
            <div className="container col-xl-10 col-xxl-8 px-4 py-5">

                <div className="row align-items-center g-lg-5">

                    <div style={{background:"black"}} className="col-md-10 mx-auto col-lg-7 fw-light text-center border rounded-3">
                        
                        <br/>

                        <h1>About us</h1><br/>

                        <div style={{fontSize: "22px"}}>
                            <p>
                                <strong>Lib2Lib</strong> is a literary portal that presents the possibility of free publication of your works.
                                <br/>Created by the <strong>ucode</strong> in 2022.
                            </p>
                        </div>

                        <br/>

                        <div style={{fontSize: "20px"}}>
                            <strong>Email:</strong> lib2lib.com@gmail.com <br/><br/>
                            <a target="_blank" style={{color: "rgb(194, 206, 255)"}} className="px-2" href="https://lms.khpi.ucode-connect.study">Ucode</a><br/>
                            <a target="_blank" style={{color: "rgb(194, 206, 255)"}} className="px-2" href="https://t.me/StevenFoy">Bug reporter</a>
                        </div>
                            
                        <br/><br/>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default About;