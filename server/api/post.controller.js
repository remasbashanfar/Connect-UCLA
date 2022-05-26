import PostModel from "../models/Post.js";
import { google } from "googleapis";  // Must use {} destructor

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
		  res.status(404)
		  res.send({ error: "Post does not exist" })
	  }
  }

  static async apiDeletePost(req, res){
    try {
      await PostModel.deleteOne({ _id: req.params.id })
      res.status(204).send()
    } catch {
      res.status(404)
      res.send({ error: "Post does not exist" })
    }
  }

  static async apiCreatePost(req, res){
    const post = new PostModel({
      title: req.body.title,
      content: req.body.content,
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
      res.status(404)
      res.send({ error: "Post does not exist" })
    }
  }
  
  static async apiAddToCalendar(req, res){
    try {
      // code from sign in and consent in client
      const { code } = req.body
      console.log(code);
      // Auth instance
      const oauth2Client = new google.auth.OAuth2(
        "1074046883630-561fblnmo26ek7lppki22d1ldflgir10.apps.googleusercontent.com",
        "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",
        "http://localhost:3000"
      );
      // Request token
      const token = await oauth2Client.getToken(code)

      res.send(token)
    } catch (error) {
      console.log(error);
      res.status(404);
      res.send({ error: "Post cannot be added to calendar" });
    }
  }

}