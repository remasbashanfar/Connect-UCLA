import UserModel from "../models/User.js"
import bcrypt from "bcrypt"

export default class UserController {

  ///// 	Create User	        /////
  static async apiRegisterUser(req, res){
    try {
        // create and encrypt a password using bcrypt (salt = random string)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        // create new user
        const newUser = new UserModel({
          username: req.body.username,
          password: hashedPassword,
          isOrganization: req.body.isOrganization,
          email: req.body.email ? req.body.email : null,
        });
        console.log(req.body.email);
        // save the new user and send back HTTP response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch {
        return res.status(500).json({ error: "Registration Error" })
    }
  } 
  ///// 	Login User          /////
  static async apiUserLogin(req, res) {
    try {
        // input username
        const user = await UserModel.findOne({username: req.body.username});
        if (!user) {
          return res.status(404).json("user not found")
        }
    
        // input password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
          return res.status(400).json("wrong password")
        }
    
        // if user + pw match 
        res.status(200).json(user)
    } catch {
        return res.status(500).json({error: "Login Error"})
    }
  }
  ///// 	Get User	        /////

  // get all users
  static async apiGetUsers(req, res) {
    const users = await UserModel.find()
    res.status(200).json(users)
  } 
  
  // get one user
  static async apiGetUser(req, res) {
    try {
      const user = await UserModel.findOne({ username: req.params.username });
      //const {password, updatedAt, isAdmin, isOrganization, createdAt, ...other} = user._doc
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  }   
  ///// 	Update User	        /////
  static async apiUpdateUser(req, res){
    try {
      const user = await UserModel.findByIdAndUpdate(req.body._id, {
        $set: req.body,
      });
      const updated_user = await UserModel.findById(user._id)
      res.status(200).json(updated_user)
    } catch {
      return res.status(500).json({ error: "User Update Error" })
    }
  }
  ///// 	Follow User	        /////
  static async apiFollowUser(req, res){
      try {
        // current user is in the body
        // profile user is in the params
        const profileUser = await UserModel.findOne({username: req.params.username})
        const user = await UserModel.findOne({username: req.body.username})
        if (!user.followers.includes(req.params.username)){
          if (profileUser.isPrivate) {
            await profileUser.updateOne( {$push: {followRequests: req.body.username} });
          } else {
            await profileUser.updateOne( {$push: {followers: req.body.username} });
            await user.updateOne( {$push: {following: req.params.username} });
          }
          res.status(200).json("Followed")
        } else{
          return res.status(403).json({ error: "Already following user"})
        }
      } catch {
        return res.status(500).json({error: "Follow Error"}) 
      }
  }
  
  ///// 	Unfollow User	        /////
  static async apiUnfollowUser(req, res){
    try {
      // current user is in the body
      // profile user is in the params
      const profileUser = await UserModel.findOne({username: req.params.username})
      const user = await UserModel.findOne({username: req.body.username})
      if (user.following.includes(req.params.username)){
        await profileUser.updateOne( {$pull: {followers: req.body.username} });
        await user.updateOne( {$pull: {following: req.params.username} });
        res.status(200).json("Unfollowed user")
      } else if (user.followRequests.includes(req.params.username)) { 
        await profileUser.updateOne( {$pull: {followRequests: req.body.username} });
      } else {
        return res.status(403).json({ error: "Not following user"})
      }
    } catch {
      return res.status(500).json({error: "Unfollow Error"})
    }
  }

  ///// 	Acccept User Follow Request	    /////
  static async apiAcceptFollow(req, res) {
    try {
      // current user is in the body
      // request username is in the params
      const requestUser = await UserModel.findOne({username: req.params.username})
      const user = await UserModel.findOne({username: req.body.username})
      if (user.followRequests.includes(req.params.username)) {
        await requestUser.updateOne({$push: {following: req.body.username} })
        await user.updateOne({$push: {followers: req.params.username} })
        await requestUser.updateOne({$pull: {followRequests: req.params.username} })
      } else {
        return res.status(404).json({ error: "Follow request not found"})
      }
    } catch {
      return res.status(500).json({error: "Accept Follow Error"})
    }
  }

  ///// 	Delete User	        /////
  static async apiDeleteUserById(req, res){
      await UserModel.findByIdAndDelete(req.params.id);
      return res.status(200).json("Account successfully deleted.")
  }

  ///// 	Add post id to rsvpList	        /////
  static async apiLikePost(req, res) {
    try {
      const user = await UserModel.findByIdAndUpdate({ _id: req.params.id },{$push:{rsvpList: req.body.postId}})
		  res.send(user)
    } catch (error) {
      console.log(error);
      res.status(404);
      res.send({ error: "Cannot add post id to rsvpList" });
    }
  }

  ///// 	Remove post id from rsvpList	        /////
  static async apiUnLikePost(req, res) {
    try {
      const user = await UserModel.findByIdAndUpdate({ _id: req.params.id },{$pull:{rsvpList: req.body.postId}})
		  res.send(user)
    } catch (error) {
      console.log(error);
      res.status(404);
      res.send({ error: "Cannot remove post id from rsvpList" });
    }
  }
}
