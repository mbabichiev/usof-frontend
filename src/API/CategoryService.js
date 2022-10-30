import axios from "axios";

export default class CategoryService {


    static async getAllCategories() {
        try {
            const response = await axios.get(`http://localhost:8080/api/categories`)
            return response.data
        }
        catch (err) {
            console.log(err);
        }
    }


    static async getCategoryById(id) {
        try {
            const response = await axios.get(`http://localhost:8080/api/categories/${id}`)
            return response.data
        }
        catch (err) {
            console.log(err);
        }
    }


    static async createCategory(title, content) {
        try {
            const response = await axios.post(`http://localhost:8080/api/categories`, {
                title: title, 
                description: content
            })
            return response.data;
        }
        catch (err) {
            return err.response.data;
        }
    }


    static async updateCategoryById(id, title, content) {
        try {
            const response = await axios.patch(`http://localhost:8080/api/categories/${id}`, {
                title: title, 
                description: content
            })
            return response.data;
        }
        catch (err) {
            return err.response.data;
        }
    }


    static async deleteCategoryById(id) {
        try {
            await axios.delete(`http://localhost:8080/api/categories/${id}`)
        }
        catch (err) {
            console.log(err);
        }
    }
}

