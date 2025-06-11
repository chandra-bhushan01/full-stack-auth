
const express = require("express");
const { AuthRoutes } = require("./routes/auth.route");
const env = require("dotenv").config()
const cors = require('cors');
const { UserRoutes } = require("./routes/user.route");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: 'http://localhost:4200', // Angular dev server
  credentials: true
}))



app.use("/auth",AuthRoutes)
app.use("/user",UserRoutes)


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`App is running on: http://localhost:${PORT}`)
})