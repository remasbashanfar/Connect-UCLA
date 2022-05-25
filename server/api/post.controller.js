import PostModel from "../models/Post.js"

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
      const { code } = req.body
      res.send(code)
    } catch {
      res.status(404)
      res.send({ error: "Post cannot be added to calendar" })
    }
  }

}