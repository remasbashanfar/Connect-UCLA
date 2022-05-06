import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import routes from "./routes.js";

// more middleware
//import bodyParser from "body-parser"; 

dotenv.config()

const port = process.env.PORT || 5000

mongoose.connect(
    process.env.ATLAS_URI, {useNewUrlParser: true})  // Maybe throw in a catch?
    .then(() => {
        const app = express()

        app.use(express.json())
        app.use(express.urlencoded({extended:true}));
        app.use("/api", routes)

        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })