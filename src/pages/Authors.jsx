import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCookie from "../scripts/getCookie";
import UserService from "../API/UserService";
import ArrayAuthors from "../components/ArrayAuthors";
import Loader from "../components/UI/Loader/Loader";
import sortUsers from "../scripts/sortUsers";


const Authors = () => {
    
    const [isLoading, setIsLoading] = useState(true)
    const [authors, setAuthors] = useState([]);


    async function getAllAuthors() {
        const response = await UserService.getAllUsers();
        setIsLoading(false)
        setAuthors(sortUsers(response));
    }


    useEffect(() => {
        getAllAuthors();
    }, [])


    return (
        <div>
            
            <section className="flex-wrap">
                <div className="row py-lg-5 text-center">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Authors</h1>
                    </div>
                </div>
            </section>

            { getCookie("id") && getCookie("role") === "admin" && !isLoading
                ? 
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="py-1 col-md-3 mb-0">
                        <Link to={"/authors/create"} className="btn btn-warning">Create author</Link>
                    </div>
                </div>
                : <></>
            }
 
            { isLoading 
                ? <Loader/>
                : <ArrayAuthors authors={authors} />    
            }

        </div>
    )

}

export default Authors;