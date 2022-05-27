import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: false,
    },
    startTime:{
        type: String,
        required: true,
    },
<<<<<<< HEAD
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: false,
    },
    endTime: {
        type: String,
        required: false,
    },
    organizer: {
        type: String,
        required: false,
    },
=======
    date:{
        type: String,
        required: true,
    },
>>>>>>> 9d11988b89171d9f0236b2ee9b69058184d6f313
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
    author: {
        type: ObjectId,
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