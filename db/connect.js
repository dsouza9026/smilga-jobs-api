const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex:true
  }).then(()=>console.log("DB connected!")).catch("DB Connection Failed!")
}

module.exports = connectDB
