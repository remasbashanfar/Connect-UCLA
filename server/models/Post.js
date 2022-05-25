import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
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
    imgurl: {
        type: String,
        required: false,
    }},
    {collection: "posts"}
)

// changed from "posts" to "Post"
const PostModel = mongoose.model("Post", PostSchema)
export default PostModel