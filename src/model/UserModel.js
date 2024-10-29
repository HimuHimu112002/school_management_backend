const mongoose = require('mongoose');
const DataShema = mongoose.Schema({
    userEmail:{
        type:String,
        required: true,
    },
    userPassword:{
        type:String,
        required: true,
    },
    userRole:{
        type:String,
        enum:["Admin","Student", "Teacher","Super-Admin"]
    },
    userStatus:{
        type:String,
        default: "unBlock",
        enum:["block","unBlock"]
    },
},
{timestamps: true, versionKey: false}
);
const UserModel = mongoose.model('user', DataShema);
module.exports = UserModel