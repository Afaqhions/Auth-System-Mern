import express, { json } from "express"
import dotenv from "dotenv"

// importing routes
import routes from './Routes/authroutes.js'

// Importing mongoDB Connection
import mongoDbConnection from "./utils/mongoDb.js";

const app = express();

mongoDbConnection()

// .env configuration
dotenv.config()

// json middleware
app.use(json())

app.use(routes);

app.listen(process.env.PORT,()=>{
    console.log(`Server Running on http://localhost:${process.env.PORT}`);    
})