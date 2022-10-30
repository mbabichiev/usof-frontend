import axios from "axios";

export default class SearchService {

    static async getUsersBySearch(data) {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/search/${data}`)
            return response.data.users;
        }
        catch (err) {
            console.log(err);
        }
    }


    static async getPostsBySearch(data) {
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/search/${data}`)
            return response.data.posts;
        }
        catch (err) {
            console.log(err);
        }
    }
}

