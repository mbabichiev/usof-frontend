import React from 'react';
import { Route, Routes } from "react-router-dom";

import Main from "../pages/Main";
import Publications from "../pages/Publications";
import PublicationId from '../pages/PublicationId';
import Authors from "../pages/Authors";
import About from '../pages/About';
import CreatePublication from '../pages/CreatePublication';
import CreateCategory from "../pages/CreateCategory";
import CreateForAdmin from '../pages/CreateForAdmin';
import CategoriesPage from "../pages/CategoriesPage";
import CategoryId from "../pages/CategoryId";
import EditCategory from '../pages/EditCategory';
import AuthorId from '../pages/AuthorId';
import EditAuthor from '../pages/EditAuthor';
import Register from '../pages/Register';
import Login from '../pages/Login';


const Routers = (props) => {

    return (
        <Routes>
            <Route exact path='/' element={<Main />} />
            <Route exach path="/posts/create" element={<CreatePublication />} />
            <Route exact path='/posts' element={<Publications />} />
            <Route exact path='/posts/:id' element={<PublicationId />} />

            <Route exact path="/categories" element={<CategoriesPage />} />
            <Route exact path="/categories/create" element={<CreateCategory />} />
            <Route exact path="/categories/:id" element={<CategoryId />} />
            <Route exact path="/categories/:id/edit" element={<EditCategory />} />

            <Route exact path='/authors' element={<Authors />} />
            <Route exach path='/authors/:id' element={<AuthorId />} />
            <Route exact path='/authors/create' element={<CreateForAdmin />} />
            <Route exach path='/authors/:id/edit' element={<EditAuthor />} />

            <Route exact path="/auth/register" element={<Register updatePage={props.updatePage} />} />
            <Route exact path="/auth/login" element={<Login updatePage={props.updatePage} />} />

            <Route exact path='/about' element={<About />} />
        </Routes>
    )
}

export default Routers;