const userModel = require('../models/user.model');


async function RegisterUser(req, res){

    const {username, email, password, role = "user"} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        username : username,
        email : email
    })
}