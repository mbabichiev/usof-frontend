import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCookie from "../scripts/getCookie";
import CategoryService from "../API/CategoryService";
import Category from "../components/Category";
import Loader from "../components/UI/Loader/Loader";


const Publications = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState([]);

    async function getCategories() {
        const response = await CategoryService.getAllCategories();
        setIsLoading(false)
        setCategories(response.categories);
    }
    

    useEffect(() => {
        getCategories();
    }, [])


    function getLoader() {
        if (isLoading) {
            return <Loader />
        }
    }


    function getButtonCreate() {
        if (getCookie("role") === "admin" && getCookie("id")) {
            return (
                <div className="container px-3 py-3 text-center">
                    <Link to={"/categories/create"} className="btn btn-warning">Create category</Link>
                </div>
            )
        }
    }


    return (
        <div>
            <section className="flex-wrap">
                <div className="row py-lg-5 text-center">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Categories</h1>
                    </div>
                </div>
            </section>

            {getLoader()}

            <div>
                <div className="container px-3 py-3 text-center">
                    {categories.map(category =>
                        <Category category={category} key={category.id} bigsize={true} />
                    )}
                </div>
                {getButtonCreate()}
            </div>
        </div>
    )

}

export default Publications;