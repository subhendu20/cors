const express = require('express')
const mongoose = require('mongoose')
const middleware = require('body-parser')
const dotenv = require('dotenv').config()
const api = require('./Schema/language')
const cors = require('cors')//-> import cors



const connectionString = process.env.DB; //->add your database link



const app = express()



// --------------------------------database connection-------------------------------------------




mongoose.connect(connectionString ,{ useNewUrlParser: true ,
           useUnifiedTopology:true
}).then(()=>{
          console.log("connected")
}).catch((e)=>{
          console.log(e)
})

// -------------------------------------middleware-----------------------------------------------

app.use(middleware.urlencoded({ extended: false }));
app.use(middleware.json());

//-------------------------------------end points------------------------------------------------


app.post('/postdata',(req,res)=>{
          const {title,tag,description} = req.body
          const user = new api({
                    title:title,
                    tag:tag,
                    description:description

          })

          user.save().then(()=>{
                    console.log(user)
                    res.send("saved")

          }).catch((e)=>{
                    console.log(e)
          })
})


//use cors as middleware for single request
app.get('/api',cors(),async(req,res)=>{
          const a  = await api.find({})
          res.send({"article":a})
})
// you can configure up your cors middleware according to your need
// router.use(cors({
//           origin:"*",    //origin domain.If you want to allow a pariticular domain then replace * with that domain name.* accept all the domain
//           methods:["POST","GET","UPDATE"], //methods
//           withcredentials:true   //Accept cookies
// }))






















app.listen(process.env.PORT, () => {
          console.log(`Running on port no ${process.env.PORT}`)
})

