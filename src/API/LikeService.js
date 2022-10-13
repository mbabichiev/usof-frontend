import axios from "axios";

export default class LikeService {

    static async checkIfLikeExistUnderPost(author_id, post_id) {

        try {
            const responce = await axios.post(`http://localhost:8080/api/posts/${post_id}/checklike`, {
                author_id: author_id
            })

            return responce.data.type;

        }
        catch (err) {
            console.log(err);
            return null;
        }
    }


    static async checkIfLikeExistUnderComment(author_id, comment_id) {

        try {
            const responce = await axios.post(`http://localhost:8080/api/comments/${comment_id}/checklike`, {
                author_id: author_id
            })

            return responce.data.type;

        }
        catch (err) {
            console.log(err);
            return null;
        }
    }


    static async deleteLikeUnderPost(author_id, post_id) {

        try {
            await axios.delete(`http://localhost:8080/api/posts/${post_id}/like`, {
                data: {
                    author_id: author_id
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }


    static async deleteLikeUnderComment(author_id, comment_id) {

        try {
            await axios.delete(`http://localhost:8080/api/comments/${comment_id}/like`, {
                data: {
                    author_id: author_id
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }


    static async createLikeUnderPost(author_id, post_id) {

        try {
            await axios.post(`http://localhost:8080/api/posts/${post_id}/like`, {
                author_id: author_id,
                type: "like"
            })
        }
        catch (err) {
            console.log(err);
        }
    }


    static async createLikeUnderComment(author_id, comment_id) {

        try {
            await axios.post(`http://localhost:8080/api/comments/${comment_id}/like`, {
                author_id: author_id,
                type: "like"
            })
        }
        catch (err) {
            console.log(err);
        }
    }


    static async createDislikeUnderPost(author_id, post_id) {

        try {
            await axios.post(`http://localhost:8080/api/posts/${post_id}/like`, {
                author_id: author_id,
                type: "dislike"
            })
        }
        catch (err) {
            console.log(err);
        }
    }


    static async createDislikeUnderComment(author_id, comment_id) {

        try {
            await axios.post(`http://localhost:8080/api/comments/${comment_id}/like`, {
                author_id: author_id,
                type: "dislike"
            })
        }
        catch (err) {
            console.log(err);
        }
    }

}

