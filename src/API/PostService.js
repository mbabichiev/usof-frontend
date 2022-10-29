import axios from "axios";

export default class PostService {


    static async createPost(author_id, title, categories, content) {

        try {
            await axios.post(`http://localhost:8080/api/posts`, {
                author_id: author_id,
                title: title,
                status: "active",
                categories: categories,
                content: content
            })
        }
        catch (err) {
            console.log(err);
        }
    }


    static async getAllPosts() {

        try {
            const response = await axios.get("http://localhost:8080/api/posts")
            
            return response.data.posts

        }
        catch (err) {
            console.log(err);
        }
    }


    static async getPostWithLimit(limit, page, sort) {
        try {
            const response = await axios.get(`http://localhost:8080/api/posts?limit=${limit}&page=${page}&sort=${sort}`);
            return response.data.posts;
        }
        catch (err) {
            console.log(err);
        }
    }


    static async getPostById(id) {
        try {

            const response = await axios.get(`http://localhost:8080/api/posts/${id}`)

            return response.data.post;

        }
        catch (err) {

            if(err.response.data !== "Post not found") {
                console.log(err);
            }
            return null;
        }
    }


    static async getPostPhotoById(id) {
        try {
            const response = await fetch(`http://localhost:8080/api/posts/${id}/photo`)

            const blob = await response.blob();

            if(blob.size === 0) {
                return '';
            }

            const downloadURL = window.URL.createObjectURL(blob)
            
            return downloadURL;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }


    static async uploadPostPhoto(id, file) {

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.patch(`http://localhost:8080/api/posts/${id}/photo`, formData)
        }
        catch (err) {
            console.log(err);
        }
    }


    static async deletePostPhotoById(id) {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${id}/photo`)
        }
        catch(err) {
            console.log(err);
        }
    }


    static async getAllPostsByCategoryIdWithLimit(limit, page, sort, category_id) {
        try {
            const response = await axios.get(`http://localhost:8080/api/categories/${category_id}/posts/?limit=${limit}&page=${page}&sort=${sort}`)
            return response.data.posts;
        }
        catch (err) {
            console.log(err);
        }
    }


    static async getPostsWithLimitByUserId(limit, page, sort, id) {

        try {
            const response = await axios.get(`http://localhost:8080/api/users/${id}/posts/?limit=${limit}&page=${page}&sort=${sort}`)
            return response.data.posts;
        }
        catch (err) {
            console.log(err);
        }
    }


    static async deletePostById(id) {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${id}`)
        }
        catch (err) {
            console.log(err);
        }
    }


    static async updatePostById(id, title, categories, status, content) {

        try {
            await axios.patch(`http://localhost:8080/api/posts/${id}`, {
                title: title,
                categories: categories,
                status: status,
                content: content
            })
        }
        catch (err) {
            console.log(err);
        }
    }


    static async getCommentsUnderPostById(id) {

        try {
            const response = await axios.get(`http://localhost:8080/api/posts/${id}/comments`);
            return response.data.comments;
        }
        catch (err) {
            console.log(err);
        }
    }


    static async addCommentUnderPostById(post_id, author_id, content) {

        try {
            await axios.post(`http://localhost:8080/api/posts/${post_id}/comments`, {
                author_id: author_id,
                content: content
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    

    static async deleteCommentById(id) {
        try {
            await axios.delete(`http://localhost:8080/api/comments/${id}`)
        }
        catch (err) {
            console.log(err);
        }
    }




}

