const { validateUsername, validateEmail, validatePassword } = require("../helper/validation")
const {hashPassword} = require("../helper/hashing")
const User = require("../models/User")


const helloworld = (req, res) => {
    res.json('Hello World!')
}

const login = (req ,res) => {
    const {username, password} = req.body
    res.json({username, password})
}

/* 
    IN - Username, Email, Password 
    OUT - Username, Password
*/

const register = async (req, res) => {
    const {username, email, password} = req.body

    v_username = await validateUsername(username)
    v_email = await validateEmail(email)
    v_password = await validatePassword(password)

    if(v_username.status === true && v_email.status === true && v_password.status === true){

        const hashedPassword = await hashPassword(password)

        try{
            const user = await User.create({
                username, 
                email, 
                password: hashedPassword,
            })

            return res.json(user.username)

        }catch(error){
            console.log(error)
        }

    } else if (v_username.status === false){
        return res.json(v_username.message)
    } else if (v_email.status === false){
        return res.json(v_email.message)
    } else if (v_password.status === false){
        return res.json(v_password.message)
    } else {
        return res.json("Internal Server Error")
    }
    

}


module.exports = {
    helloworld,
    login,
    register
}