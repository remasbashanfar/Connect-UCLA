import express from "express";
const router = express.Router()

/////	 Controller Import		/////
import Post from "./api/post.controller.js"
import User from "./api/user.controller.js"

///// 	Establish endpoints and link to API	  /////
 
///// 	POSTS 	  /////
router.get("/posts", Post.apiGetPosts)
router.get("/posts/:id", Post.apiGetPostById)
router.post("/posts/", Post.apiCreatePost)
router.get("/posts/filter/tags", Post.apiGetPostWithFilter)
router.post("/posts", Post.apiCreatePost)
router.patch("/posts/:id", Post.apiUpdatePost)
router.delete("/posts/:id", Post.apiDeletePost)
router.post("/posts/add-to-calendar", Post.apiAddToCalendar)
router.patch("/posts/rsvp1/:id",Post.apiLikePost)
router.patch("/posts/rsvp0/:id",Post.apiUnLikePost)
router.get("/posts/profile/:userId", Post.apiGetPostsByUser)
router.get("/posts/personalized/:userId", Post.apiGetPersonalized)

///// 	USERS 	  /////
router.get("/users", User.apiGetUsers)
router.get("/users/:username", User.apiGetUser)
// router.get("/users/:username", User.apiGetUserByUsername)
router.post("/users/register", User.apiRegisterUser)
router.post("/users/login", User.apiUserLogin)
router.patch("/users/:id", User.apiUpdateUserById)
router.put("/users/:id", User.apiFollowUserById)
router.put("/users/:id", User.apiUnfollowUserById)
router.delete("/users/:id", User.apiDeleteUserById)
router.patch("/users/rsvp1/:id",User.apiLikePost)
router.patch("/users/rsvp0/:id",User.apiUnLikePost)

///// 	GOOGLE CALENDAR 	  /////


export default router;