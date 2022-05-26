import PostModel from "../models/Post.js";
import { google } from "googleapis";  // Must use {} destructor
import dotenv from "dotenv";

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
      res.status(404);
      res.send({ error: "Post cannot be added to calendar" });
    }
  }

}