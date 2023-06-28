const mongoose = require("mongoose");

// Insert your connection string inside this variable
const connectionString = 'mongodb+srv://yacinelariane:lebylkusdu92@cluster0.paptrih.mongodb.net/tickethack';

mongoose.set("strictQuery", true); // Remove Mongoose warning in console

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch(error => console.error(error));


module.exports = connectionString; // Do not edit/remove this line