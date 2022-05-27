import UserModel from "../models/User.js"
import bcrypt from "bcrypt"
import bodyParser from "body-parser"

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
        res.status(500).json({ error: "Registration Error" })
    }
  } 
    ///// 	Create User	        /////
  static async apiCreateUser(req, res){
    try {
        // create and encrypt a password using bcrypt (salt = random string)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        // create new user
        const newUser = new UserModel({
          username: req.body.username,
          password: hashedPassword,
        });
        
        // save the new user and send back HTTP response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch {
        res.status(500).json({ error: "Registration Error" })
    }
  } 

  ///// 	Login User          /////
  static async apiUserLogin(req, res) {
    try {
        // input username
        const user = await UserModel.findOne({username: req.body.username});
        !user && res.status(404).json("user not found")
    
        // input password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")
    
        // if user + pw match 
        res.status(200).json(user)
    } catch {
        res.status(500).json({error: "Login Error"})
    }
  }
  ///// 	Get User	        /////
  static async apiGetUsers(req, res) {
    const users = await UserModel.find()
    res.status(200).json(users)
}
  static async apiGetUserById(req, res) {
    try {
        const user = await UserModel.findOne({ _id: req.params.id })
        // create object "other" that contains the unlisted elements within user._doc
        const {password, updatedAt, isAdmin, isOrganization, createdAt, ...other} = user._doc
        res.status(200).json(other)
    } catch {
        res.status(404).json({ error: "User does not exist" })
    }
}   
  ///// 	Update User	        /////
  // tutorial at https://youtu.be/ldGl6L4Vktk?t=2438
  static async apiUpdateUserById(req, res){
    // if the user submits their own id 
    if (req.body.userId === req.params.id) {
      if (req.body.password){
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch(err){
          return res.status(500).json({error: "Password Reset Error"})
        }
      }
      try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated")
      } catch {
        return res.status(500).json({ error: "User Update Error" })
      }
    }
    else {
      return res.status(404).json({ error: "User not found" })
    }
  }
  ///// 	Follow User	        /////
  static async apiFollowUserById(req, res){
    // confirm that users are different 
    if(req.body.userId !== req.params.id){
      try {
        // confirm that current user is not already following other
        const user = await UserModel.findById(req.params.id)
        const userCurr = await UserModel.findById(req.body.userId)
        if (!user.followers.includes(req.body.userId)){
          await user.updateOne( {$push: {followers: req.body.userId} });
          await userCurr.updateOne( {$push: {followers: req.params.userId} });
          res.status(200)
          res.send("Followed")
        } else{
          res.status(403)
          res.send({ error: "Already following user"})
        }
      } catch {
        res.status(500) 
        res.send({error: "Follow Error"})
      }
    } else{
      res.status(403)
      res.send({ error: "You can not follow yourself"})
    } 
  }
  ///// 	Unfollow User	        /////
  static async apiUnfollowUserById(req, res){
    try {
      const user = await UserModel.findById(req.params.id)
      const userCurr = await UserModel.findById(req.body.userId)
      if (user.followers.includes(req.body.userId)){
        await user.updateOne( {$pull: {followers: req.body.userId} });
        await userCurr.updateOne( {$pull: {followers: req.body.userId} });
        res.status(200)
        res.send("Unfollowed user")
      } else {
        res.status(403)
        res.send({ error: "Not following user"})
      }
    }
    catch {
      res.status(500) 
      res.send({error: "Unfollow Error"})
    }
  }
  ///// 	Delete User	        /////
  static async apiDeleteUserById(req, res){
    if (req.body.userId === req.params.id) {
      try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        res.status(200)
        res.send("Account successfully deleted.")
      } catch {
        res.status(500)
        res.send({ error: "User Deletion Error"}) 
      }
    } else {
      res.status(403)
      res.send({ error: "You can only delete your own account."})
    }
  }
}