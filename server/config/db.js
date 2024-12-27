const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () => {
  
  // return mongoose.connect(process.env.MONGO_URL);
  return mongoose.connect("mongodb://127.0.0.1:27017/Atlanwa-LMS");
};
