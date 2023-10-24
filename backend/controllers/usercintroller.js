const {User} = require("../models")
const bcrypt= require("bcrypt")
const jwt =require("jsonwebtoken")
require('dotenv').config()


const userSignUp = async (req, res) =>{
    const {Name, email, Password} = req.body

    const user = await User.findOne({
        where: {email}
    })

    if(user){
        res.send({message: "Email already exists....", status:409})
    }
    else{
        if (Name && email && Password){
            try {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(Password, salt)
                console.log(hashPassword)
                 await User.create({
                    Name,
                    email,
                    Password: hashPassword
                })
                res.status(201).send({message:"User Registered successfully....", status: 201})
            } catch (error) {
                res.send({ message: "unable to request"})

            }
        }
        else {
        res.send({ message: "all fields are required...", status: 500})
        }
    }
}



const userLogin = async (req, res) =>{
    try{
        const { email, Password} = req.body
        if (email && Password){
            const user = await User.findOne({ where:{email:email}})
            if (user) {
                const isMatch = await bcrypt.compare(Password, user.Password)
                if( email == user.email && isMatch){
                    console.log(process.env.SECRET_KEY)
                    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {expiresIn: "1h" })
                    console.log(token)
                    res.send({ message:"Login is successful" ,status:200 , token})
                } else{
                res.send({message:"either email or password is incorrect..."})
                }
            }else{
                res.send({ message:"You are not registered user....",status:400})
            }
        }else {
            res.send({message:"all fields are required..", status:400})
        }

    } catch (error){
        console.log(error)
        res.send({message: "unable to login....",status:400})
    }
}



const loggedUser = async (req,res)=>{
    res.send({user:req.userId, message:"success"})
}

module.exports = {userSignUp, userLogin, loggedUser}
