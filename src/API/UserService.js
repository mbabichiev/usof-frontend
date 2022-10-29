import axios from "axios";

export default class UserService {


    static async register(login, firstname, lastname, password, email) {

        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                login: login,
                firstname: firstname,
                lastname: lastname,
                password: password,
                email: email
            })
            return response;
        }
        catch (err) {
            return err.response;
        }
    }


    static async createUser(login, firstname, lastname, password, email, role) {

        try {
            const response = await axios.post("http://localhost:8080/api/users", {
                login: login,
                firstname: firstname,
                lastname: lastname,
                password: password,
                email: email,
                role: role
            })
            return response;
        }
        catch (err) {
            return err.response;
        }
    }



    static async getUserById(id) {
        try {

            const response = await axios.get(`http://localhost:8080/api/users/${id}`)
            return response.data.user;

        }
        catch (err) {
            console.log(err);
            return null;
        }
    }


    static async getUsersWithLimitAndPage(limit, page) {
        try {
            const response = await axios.get(`http://localhost:8080/api/users?limit=${limit}&page=${page}`);
            return response.data.users;
        }
        catch (err) {
            console.log(err);
        }
    }


    static async getAllUsers() {

        try {

            const response = await axios.get(`http://localhost:8080/api/users`)
            return response.data.users;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }


    static async getUserAvatarById(id) {
        
        try {
            const response = await fetch(`http://localhost:8080/api/users/${id}/avatar`)
            
            const blob = await response.blob();
            const downloadURL = window.URL.createObjectURL(blob)
            
            return downloadURL;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }


    static async getDefaultAvatar() {
        try {
            const response = await fetch(`http://localhost:8080/api/users/default`)
            
            const blob = await response.blob();
            const downloadURL = window.URL.createObjectURL(blob)
            
            return downloadURL;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }


    static async deleteUserAvatarById(id) {
        
        try {
            axios.delete(`http://localhost:8080/api/users/${id}/avatar`)
        }
        catch (err) {
            console.log(err);
        }
    }


    static async deleteUserById(id) {
        try {
            await axios.delete(`http://localhost:8080/api/users/${id}`)
        }
        catch (err) {
            console.log(err);
        }
    }


    static async uploadAvatar(id, file) {

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.patch(`http://localhost:8080/api/users/${id}/avatar`, formData)
        }
        catch (err) {
            console.log(err);
        }
    }


    static async updateUserById(id, firstname, lastname, login, email) {

        try {
            await axios.patch(`http://localhost:8080/api/users/${id}`, {
                firstname: firstname,
                lastname: lastname,
                login: login,
                email: email
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    

}

