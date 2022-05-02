import usersDAO from "../dao/usersDAO.js";

//A query is something after ?
//A param is something in the url after /

export default class usersController{
    static async apiGetUsers(req, res, next){
        //checks if usersperpage exist in url and converts it into an int , if not default is 20 
        const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.username){
            filters.username = req.query.username
        }

        const {usersList, totalNumOfUsers} = await usersDAO.getUsers({
            filters,
            page,
            usersPerPage,
        })

        let response = {
            users: usersList,
            page: page,
            filters: filters,
            entries_per_page: usersPerPage,
            total_results: totalNumOfUsers,
        }
        //send json response to url
        res.json(response)
    }
}