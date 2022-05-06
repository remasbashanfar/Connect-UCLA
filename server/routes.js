import express from "express";
const router = express.Router()

/////	 Controller Import		/////
import Post from "./api/post.controller.js"
import User from "./api/user.controller.js"

///// 	Establish endpoints and link to API	  /////

///// 	POSTS 	  /////
router.get("/posts", Post.apiGetPosts)
router.get("/posts/:id", Post.apiGetPostById)
router.post("/posts", Post.apiCreatePost)
router.patch("/posts/:id", Post.apiUpdatePost)
router.delete("/posts/:id", Post.apiDeletePost)

///// 	USERS 	  /////
router.get("/users", User.apiGetUsers)
router.get("/users/:id", User.apiGetUserById)
router.post("/users/register", User.apiCreateUser)
router.post("/users/login", User.apiUserLogin)
router.put("/users/:id", User.apiUpdateUserById)
router.put("/users/:id", User.apiFollowUserById)
router.put("/users/:id", User.apiUnfollowUserById)
router.delete("/users/:id", User.apiDeleteUserById)

///// 	COMMENTS 	  /////

export default router;