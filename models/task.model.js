// Tasks model
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
        minlength : 3,
        maxlength : 50
    },
    description : {
        type : String,
        trim : true,
        minlength : 3,
        maxlength : 500
    },
    status : {
        type : String,
        enum : ["To do", "In progress", "Completed"],
        default : "To do",
    },
    priority : {
        type : String,
        enum : ["Low", "Medium", "High"],
        default : "Low"
    },
    dueDate : {
        type : Date,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
}, { timestamps : true });

const Task = mongoose.model('Task', taskSchema);
 
module.exports = Task;