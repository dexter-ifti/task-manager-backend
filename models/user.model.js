// User model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    lastName : {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true, 
    },
    password : {
        type : String,
        required : [true, 'Password is required'],
        trim : true,
        minlength : 6
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) { 
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) { 
    return await bcrypt.compare(password, this.password); 
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Add token to user's tokens array
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};
const User = mongoose.model('User', userSchema);

module.exports = User;