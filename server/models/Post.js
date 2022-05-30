import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    startTime:{
        type: String,
        required: true,
    },
    imgurl: {
        type: String,
        required: false,
    },
    RSVP_counter: {
        type: Number,
        required: true,
    },
    tags: {
        type: Array,
        required: false,
    }, 
    userId: {
        type: ObjectId,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    endTime: {
        type:String,
        required: false,
    },
    location:{
        type: String,
        required: false,
    }},
    {collection: "posts"}
);
 

// changed from "posts" to "Post"
const PostModel = mongoose.model("Post", PostSchema)
export default PostModel