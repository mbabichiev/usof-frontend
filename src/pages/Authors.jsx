import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import getCookie from "../scripts/getCookie";
import UserService from "../API/UserService";
import ArrayAuthors from "../components/ArrayAuthors";
import Loader from "../components/UI/Loader/Loader";
import { usePagination } from "../scripts/usePagination";


const Authors = () => {

    const limit = 12;
    const [isLoading, setIsLoading] = useState(true);
    const [isLastAuthor, setIsLastAuthor] = useState(false);
    const [page, setPage] = useState(1);
    const [authors, setAuthors] = useState([]);
    const lastElement = useRef();


    async function getAllAuthors() {
        setIsLoading(true);
        const arr = await UserService.getUsersWithLimitAndPage(limit, page);
        setIsLoading(false);

        if (arr.length !== 0) {
            if (page === 1) {
                setAuthors(arr)
            }
            else {
                setAuthors([...authors, ...arr])
            }
        }
        else {
            setIsLastAuthor(true);
        }
    }


    usePagination(lastElement, !isLastAuthor, isLoading, () => {
        setPage(page + 1)
    })


    useEffect(() => {
        getAllAuthors();
    }, [page])


    function getAuthors() {
        if (isLoading && authors.length === 0) {
            return <Loader />
        }
        return <ArrayAuthors authors={authors} />
    }


    return (
        <div>
            <section className="flex-wrap">
                <div className="row py-lg-5 text-center">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Authors</h1>
                    </div>
                </div>
            </section>

            {(getCookie("id") && getCookie("role") === "admin" && !isLoading) &&
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="py-1 col-md-3 mb-0">
                        <Link to={"/authors/create"} className="btn btn-warning">Create author</Link>
                    </div>
                </div>
            }

            {getAuthors()}
            <div ref={lastElement} style={{height:"10px"}}></div>
        </div>
    )

}

export default Authors;