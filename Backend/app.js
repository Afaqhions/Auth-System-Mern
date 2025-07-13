import express, { json } from "express"
import dotenv from "dotenv"

// .env configuration
dotenv.config()

// importing routes
import routes from './Routes/authroutes.js'

// Importing mongoDB Connection
import mongoDbConnection from "./utils/mongoDb.js";

const app = express();

// json middleware
app.use(json())

app.use(routes);

// Start the server after connecting to the database
(async () => {
    try {
        await mongoDbConnection();
        app.listen(process.env.PORT, () => {
            console.log(`Server Running on http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database", error);
        process.exit(1);
    }
})();