import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default:""
    },
    coverPicture:{
        type: String,
        default:""
    },
    followers: {
        type: Array,
        default:[]
    },
    following: {
        type: Array,
        default:[]
    },
    followRequests: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean, 
        default: false, 
    },
    isOrganization: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        max: 50
    },
    rsvpList: {
        type: Array,
        default: []
    },
    isPrivate: {
        type: Boolean,
        default: false,
    }
},
// automatically update timestamps
{timestamps: true}
);


// can condense these with module.exports = mongoose.model("user", UserSchema)
// changed mongoose.model("users", UserSchema) to mongoose.model("User", UserSchema)
const UserModel = mongoose.model("User", UserSchema)
export default UserModel