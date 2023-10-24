const {Students} = require("../models")

const getData = async (req, res) =>{
    const students = await Students.findAll({})
    res.send(students)
}

const postData = async (req, res) =>{
    console.log(req.body)
    const {Name, Age, email} = req.body
    const students = await Students.create({
        Name:Name,
        Age:Age,
        email:email
    })
    res.send({message:"Data inserted successfully...."})
}


const updateData = async (req, res) =>{
    const {Name, Age, email } = req.body
    const students = await Students.update({
        Name,
        Age,
        email,
    },{
        where: {
            id:req.params.id
        }
    })
    res.send({ message: "Data Updated successfully..." })
}


const deleteData =async (req, res) => {
    const students = await Students.destroy({
        where:{
            id:req.params.id
        }
    })
    res.send({ message: "Data deleted successfully"})
}


const singleData = async (req, res) => {
    const students = await Students.findByPk(req.params.id)
    res.send({ message:" Data retrevied successfully", data:students})
}



module.exports = {getData, postData, updateData, deleteData, singleData}