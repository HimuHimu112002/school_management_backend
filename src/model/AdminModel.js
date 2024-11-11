const mongoose = require('mongoose');
const DataShema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    AdminName:{
        type:String,
        required: true
    },
    AdminNid:{
        type:String,
        required: true,
    },
    AdminBio:{
        type:String,
        required: true,
    },
    AdminAddress:{
        type:String,
        required: true,
    },
    AdminPhone:{
        type:String,
        required: true,
    },
    AdminEmail:{
        type:String,
        required: true,
        unique: true,
    },
    AdminImage:{
        type:String
    },
    AdminRole:{
        type:String,
        default: "Admin",
    },
    AdminStatus:{
        type:String,
        default: "unBlock",
        enum:["block","unBlock"]
    },
},
{timestamps: true, versionKey: false}
);
const AdminModel = mongoose.model('Admin', DataShema);
module.exports = AdminModel