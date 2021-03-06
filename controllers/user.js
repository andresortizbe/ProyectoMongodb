const User = require('../models/user');

const getUsers = async (req, res) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 20;    
    try{
        let users = await User.find().skip((page - 1) * limit).limit(limit);
        let documents = await User.count();
        let totalPages = Math.ceil(documents/limit)
        res.json({
            totalResults: documents,
            limit: limit,
            page: page,
            totalPages: totalPages,
            hasPreviousPage: page > 1 ? true : false,
            hasNextPage: page < totalPages ? true : false,
            prevPage: page > 1 ?  page - 1 : 1,
            nextPage: page < totalPages ? page + 1 : totalPages,
            results: users 
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            message: error
        })
    }
}

const updateUser = () => {

}

module.exports = {
    getUsers
}