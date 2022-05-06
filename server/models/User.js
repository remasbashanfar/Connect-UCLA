import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // profile picture here
    profilePicture: {
        type: String,
        default:""
    },
    coverPicture:{
        type: String,
        default:""
    },
    // if we want to have followers...
    followers: {
        type: Array,
        default:[]
    },
    isAdmin: {
        type: Boolean, 
        default: false, 
    },
    // can implement verification program
    // true for clubs, sports, etc.
    isOrganization: {
        type: Boolean,
        default: false,
    },
    // used in users.js 
    description: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    relationship: {
        type: Number,
        enum:[1, 2, 3]      // single, married, etc. 
    }
},
// automatically update timestamps
{timestamps: true}
);


// can condense these with module.exports = mongoose.model("user", UserSchema)
// changed mongoose.model("users", UserSchema) to mongoose.model("User", UserSchema)
const UserModel = mongoose.model("User", UserSchema)
export default UserModel