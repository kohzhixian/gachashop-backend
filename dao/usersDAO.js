import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let users

export default class usersDAO{
    static async injectDB(conn){
        if(users){
            return
        }
        try{
            // connect to database to get collection Users
            users = await conn.db(process.env.GACHABASE_NS).collection("Users")
        }catch(e){
            console.error(`unable to establish a collection handle in usersDAO: ${e}`)
        }
    }

    static async getUsers({
        filters = null,
        page = 0,
        usersPerPage = 20,
    } = {}){
        let query
        if(filters){
            if("username" in filters){
                query = {"username": {$eq: filters["username"]}}
            }
        }
    

        let cursor
        // find all the users that matches the query
        try{
            cursor = await users.find(query)
        }catch(e){
            console.error(`unable to issue find command, ${e}`)
            return {usersList: [], totalNumOfUsers: 0}
        }
        //limit restaurants per page and skip to specific page of results.
        const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page)

        try{
            //set users list to an array
            const usersList = await displayCursor.toArray()
            const totalNumOfUsers = await users.countDocuments(query)
            return {usersList, totalNumOfUsers}
        }catch(e){
            console.error(`unable to convert cursor to array or problem counting documents, ${e}`)
            return{usersList: [], totalNumOfUsers: 0}
        }
    }       
}