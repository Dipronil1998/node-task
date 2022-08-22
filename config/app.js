const express = require('express');
const db = require('../src/db/conn');
const cors = require('cors')
db.dbConnect(); // database connection
const app = express();
app.use(express.json({}));
port = process.env.PORT || 3001;
const {pageNotFound} = require('../src/middleware/PageNotFound');
const {errorHandler} = require('../src/middleware/ErrorHandler');
app.use(cors())

// Router
const userRouter=require('../src/router/UserRoute');
const projectRouter=require('../src/router/ProjectRoute');
const taskRouter=require('../src/router/TaskRoute');

app.use('/auth/', userRouter);
app.use('/project/', projectRouter);
app.use('/task/', taskRouter);
app.use(pageNotFound);
app.use(errorHandler);

module.exports=app;
