require('dotenv').config();
const express = require('express')

const PORT = process.env.PORT || 5000;
const path = require("path")
// Config
const config = require("./src/services/config");
// DB
const db = require("./src/services/db");
const errorHandler = require("./src/middlewares/ErrorHandlingMiddleware")
const cors = require('cors')
const fileUpload = require("express-fileupload")



const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'./src/static')))
app.use(fileUpload({}))

// Routers
const brandRouter = require("./src/routes/brandRouter");
const itemRouter = require("./src/routes/itemRouter");
const categoryRouter = require("./src/routes/categoryRouter");
const userRouter = require("./src/routes/userRouter");
const basketRouter = require("./src/routes/basketRouter");

// Routes
app.use("/brand", brandRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/item", itemRouter);
app.use("/basket", basketRouter);

app.use(errorHandler)

const start = () => {
    try{
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch (e) {
        console.log(e)
    }
}

start()


