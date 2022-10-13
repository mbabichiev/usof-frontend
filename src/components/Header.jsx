import React, { useState } from "react";
import {Link} from "react-router-dom";

const getCookie = require("../scripts/getCookie.js")

const Header = () => {

    const [isAuth, setAuth] = useState(false);
    let id = getCookie("id")
    if(id && !isAuth) {
        setAuth(true)
    }

    const iconStyle = {
        color: "white",
        fontSize: "30px"
    };


    function logout() {
        document.cookie = "id=0;max-age=0;path=/"
        document.cookie = "role=user;max-age=0;path=/"
        setAuth(false);
    }

    return (
        <div>
        <header style={{background:"black"}} className="p-3 text-bg-dark">
            <div className="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                    <Link to="/" style={{textDecoration:'none'}}>
                        <a class="border rounded-2 d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <div style={iconStyle} color="white">L2L</div>
                        </a>
                    </Link>
    
                    <div class="col-md-7 text-center">
                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">

                            {isAuth === true
                                ? <li><Link to={'/authors/' + id} style={{textDecoration:'none'}}><a class="nav-link px-2 text-secondary">Home</a></Link></li>
                                : <div></div>   
                            }

                            <li><Link to="/authors" style={{textDecoration:'none'}}><a class="nav-link px-2 text-white">Authors</a></Link></li>
                            <li><Link to="/posts" style={{textDecoration:'none'}}><a class="nav-link px-2 text-white">Publications</a></Link></li>
                            <li><Link to="/categories" style={{textDecoration:'none'}}><a class="nav-link px-2 text-white">Categories</a></Link></li>
                            <li><Link to="/about" style={{textDecoration:'none'}}><a class="nav-link px-2 text-white">About</a></Link></li>
                        
                        </ul>
                    </div>
        
                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"></input>
                    </form>
                    
                    {id 
                        ? 
                            <div class="text-end">
                                <form><button type="button" onClick={logout} class="btn btn-outline-light me-2">Logout</button></form>
                            </div>
                        : 
                            <div class="text-end">
                                <Link to="/auth/login" class="btn btn-outline-light me-2">Login</Link>
                                <Link to="/auth/register" class="btn btn-warning">Registration</Link>
                            </div>
                    }
                </div>
            </div>
        </header>
        </div>
    )
}

export default Header;
