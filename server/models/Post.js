import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }},
    {collection: "posts"}
)

// changed from "posts" to "Post"
const PostModel = mongoose.model("Post", PostSchema)
export default PostModel