import express from "express";
const router = express.Router()

/////	 Controller imports		/////
import PostController from "./api/post.controller.js"
//import CommentHandler from "./api/comment.controller.js"

///// 	Establish endpoints and link to API	  /////

router.get("/posts", PostController.apiGetPosts)
router.post("/posts", PostController.apiCreatePost)
router.get("/posts/:id", PostController.apiGetPostById)
router.patch("/posts/:id", PostController.apiUpdatePost)
router.delete("/posts/:id", PostController.apiDeletePost)

export default router;