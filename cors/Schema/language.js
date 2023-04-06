const mongoose = require('mongoose')

const api = new mongoose.Schema({
          title:{
                    type:String,
                    required:true
          },
          tag:{
                    type:String,
                    required:true
          },
          description:{
                    type:String,
                    required:true
          }


})

const api1 = new mongoose.model('api',api);
module.exports = api1;