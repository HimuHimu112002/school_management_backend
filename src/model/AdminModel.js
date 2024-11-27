const mongoose = require('mongoose');
const DataShema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    AdminName:{
        type:String,
        required: true,
        required: [true, "Name is required"],
    },
    AdminNid:{
        type:String,
    },
    AdminBio:{
        type:String,
    },
    AdminAddress:{
        type:String,
    },
    AdminPhone:{
        type:String,
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