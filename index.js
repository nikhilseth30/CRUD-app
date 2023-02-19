const express = require('express')
const app = express()
const engine = require('express-handlebars').engine
const db = require('./model/connection')

// middleware
app.use(express.json())  
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// default page
app.get("/",(req,res)=>{
    res.render('home')
})

// Create user
app.post("/adduser",(req,res) =>{
    // console.log(req.body)
    const user = {name:req.body.name,email:req.body.email,phone:req.body.phone,city:req.body.city}
    let sql = "INSERT INTO `employee` SET ?"
    db.query(sql,user,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
 })

// showUser
app.get("/showUser",(req,res) =>{
    let sql = "SELECT * FROM `employee`"
    db.query(sql,(err,result)=>{
        if (err) throw err;
        else 
        // res.json(result)
        res.render('show',{list:result})
    })

})

// show a particular employee
app.get("/showuser/:email",(req,res)=>{
    let sql = `SELECT * FROM employee WHERE email = '${req.params.email}'`
    db.query(sql,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})

// delete user
app.get("/deleteUser/:Name",(req,res) =>{
    let emailId = req.params.email
    let sql = `DELETE FROM employee WHERE Name = '${req.params.Name}'`
    db.query(sql,(err,result)=>{
        if(err) throw err;
        else
         res.redirect("/showUser")
    })
})

// update user
app.put("/updateUser/:email",(req,res)=>{
    let email = req.params.email
    const name = req.body.name
    const phone = req.body.phone
    const city = req.body.city
    let sql = `UPDATE employee SET name='${name}',phone='${phone}',city='${city}'`
    db.query(sql,(err,result)=>{
        if (err) throw err
        else res.json(result)
    })
})


const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))
