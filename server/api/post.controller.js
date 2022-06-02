import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";
import { google } from "googleapis";  // Must use {} destructor
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export default class PostController {

  static async apiGetPosts(req, res) {
      const posts = await PostModel.find()
      res.send(posts)
  }
  
  static async apiGetPostById(req, res){
	  try {
		  const post = await PostModel.findOne({ _id: req.params.id })
		  res.send(post)
	  } catch {
		  return res.status(404).json({ error: "Post does not exist" })
	  }
  }
  // username is in the params
  static async apiGetPostsByFollowing(req, res) {
    try{
      const user = await UserModel.findOne({username: req.params.username})
      var posts = [];
      for (let i = 0; i < user.following.length; i++) {
        const follower = await UserModel.findOne({username: user.following[i]})
        const follower_posts = await PostModel.find({userId: follower._id})
        follower_posts.map((post) => posts.push(post))
      }
    } catch (err) {
		  return res.status(404).json({ error: "Post retrieval error" })
    }
  }

  static async apiGetPostsByUser(req, res){
    try {
		  const user = await UserModel.findOne({ username: req.params.username })
      const posts = await PostModel.find({userId: user._id})
		  res.send(posts)
	  } catch (err) {
		  return res.status(404).json({ error: "User does not exist" })
	  }
  }
  
  static async apiGetPostsByRSVP(req, res){
    try {
		  const user = await UserModel.findOne({ username: req.params.username })
      const posts = []
      for (let index = 0; index < user.rsvpList.length; index++) {
        const post_id = user.rsvpList[index]
        const post = await PostModel.findById(post_id)
        posts.push(post)
      }
      console.log(posts)
		  res.send(posts)
	  } catch (err) {
		  return res.status(404).json({ error: "User does not exist" })
	  }
  }

  static async apiGetPersonalized(req, res){
    try {
      // Get all posts
      const posts = await PostModel.find()
      // Get user object
		  const user = await UserModel.find({ _id: req.params.userId })
      // Get all rsvp ids, then posts from user
      const rsvpList = user[0].rsvpList.map((id)=>mongoose.Types.ObjectId(id))
      const likedPosts = await PostModel.find({"_id" : {$in : rsvpList}})
      // Get liked tags in array
      const tagList = [].concat.apply([],likedPosts.map((post)=>post.tags))
      // Convert to count dict
      const count_dict = {}
      for (const tag of tagList) {
        if (tag in count_dict) {
          count_dict[tag] += 1
        } else {
          count_dict[tag] = 1
        }
      }
      // Sort posts by count dict w. custom comparator
      const score = (tag) => {
        return (tag in count_dict) ? count_dict[tag] : 0
      }
      // First sort by popular category, if same score, sort by rsvp count
      posts.sort(function(a,b){
        const scoreA = Math.max(...a.tags.map((tag) => score(tag)))
        const scoreB = Math.max(...b.tags.map((tag) => score(tag)))
        if (scoreA == scoreB) {
          return b.RSVP_counter - a.RSVP_counter
        }
        return scoreB - scoreA
      });

		  res.send(posts)
	  } catch (err) {
		  res.status(err)
	  }
  }


  static async apiDeletePost(req, res){
    try {
      await PostModel.deleteOne({ _id: req.params.id })
      res.status(204).send()
    } catch {
      return res.status(404).json({ error: "Post does not exist" })
    }
  }

  static async apiGetPostWithFilter(req,res){
    try{
      const postTags = req.query.tags
      
      const posts = await PostModel.find({tags : {$in : postTags}})
      res.send(posts)
    }catch{
      return res.status(404).send("Cant filter posts")
    }
  }

  static async apiCreatePost(req, res){
    console.log(req.body);
    const post = new PostModel({
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
      imgurl: req.body.imgurl,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      author: req.body.author,
      tags: req.body.tags,
      location: req.body.location,  
      RSVP_counter: 0,
    })
    await post.save()
    res.send(post)
  }

  static async apiUpdatePost(req, res){
    try {
      const post = await PostModel.findOne({ _id: req.params.id })
      if (req.body.title) {
        post.title = req.body.title
      }
      if (req.body.content) {
        post.content = req.body.content
      }
      await post.save()
      res.send(post)
    } catch {
      return res.status(404).json({ error: "Post does not exist" })
    }
  }
  
  // Creates Auth + Refresh token for Google Calendar
  static async apiAddToCalendar(req, res){
    try {
      // code from sign in and consent in client and props passed to component
      const { code, props } = req.body;

      // Auth instance
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "http://localhost:3000"
      );

      // Request token
      const token = await oauth2Client.getToken(code)

      // set credentials to access calendar
      oauth2Client.setCredentials({
        access_token: token.tokens.access_token,
        refresh_token: token.tokens.refresh_token,
        expiry_date: token.tokens.expiry_date,
      });

      // Add calendar event
      const calendar = google.calendar('v3');
      const result = calendar.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        requestBody: {
          summary: props.summary,
          description: props.description,
          location: props.location,
          start: {dateTime: new Date(props.start)},
          end: {dateTime: new Date(props.end)},
        },
      })

      res.send(result)
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Post cannot be added to calendar" });
    }
  }


  static async apiLikePost(req, res) {
    console.log("Like post called") //REMOVE
    try {
      const post = await PostModel.findByIdAndUpdate({ _id: req.params.id },{$inc:{RSVP_counter: 1}})
		  res.send(post)
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Cannot RSVP to post" });
    }
  }

  static async apiUnLikePost(req, res) {
    console.log("Like post called") //REMOVE
    try {
      const post = await PostModel.findByIdAndUpdate({ _id: req.params.id },{$inc:{RSVP_counter: -1}})
		  res.send(post)
    } catch (error) {
      console.log(error);
      res.status(404);
      res.send({ error: "Cannot un-RSVP to post" });
    }
  }

}