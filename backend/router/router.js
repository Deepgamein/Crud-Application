const { Router } = require('express');
const { getData, postData, updateData, deleteData, singleData } = require('../controllers/testcontrols');
const { userSignUp, userLogin, loggedUser } = require('../controllers/usercintroller');
const { userDashboard } = require('../middleware/authmiddleware');
// const { testFun } = require('../controllers/testController');
const route = Router()

route.get('/' , (req , res)=>{

   res.send('hello I from Router')
})


route.get("/get-data", getData)
route.post("/post-data", postData)
route.put("/update-data/:id?", updateData)
route.delete("/delete-data/:id?", deleteData)
route.get("/single-data/:id?", singleData)


// Auth
route.post("/sign-up", userSignUp)
route.post("/login", userLogin)
route.get("/dashboard", userDashboard, loggedUser)



module.exports = route;