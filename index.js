const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();


const port = process.env.PORT || 5001;
const URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

const userRouter = require('./router/userRouter');
const taskRouter = require('./router/taskRouter');


app.use(cors());
app.use(express.json());

mongoose.connect(`${URL}/${DB_NAME}`)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });
    
app.use('/users', userRouter);
app.use('/tasks', taskRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})