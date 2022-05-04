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

const PostModel = mongoose.model("posts", PostSchema)
export default PostModel