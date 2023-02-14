const mysql = require('mysql')

// Database 
const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:"",
    database:'ems'
})

db.connect((err)=>{
    if(err) console.log(err.sqlMessage)
    else console.log("Database Connection")
})


module.exports = db