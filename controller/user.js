const User = require('../model/userModel');
const bcrypt = require('bcrypt')
function isstringinvalid(string){
  if(string == undefined || string.length === 0){
    return true;
  }
  else{
    return false;
  }
}

const postSignup = async (req,res,next) => {

  try{
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    console.log('email', email)
    if(isstringinvalid(fullName)|| isstringinvalid(email) || isstringinvalid(password)){
      return res.status(400).json({err: "Bad parameters. Something is missing"})
    }
    const saltrounds = 10;
    bcrypt.hash(password ,saltrounds ,async (err, hash) => {
      console.log(err) 
      await User.create({
        fullName: fullName,
        email: email,
        password: hash
      })
      res.status(201).json({message: 'Sign Up Successful'});
    })
    
  }
  catch(err){
    console.log("error occur in Signup",err.stack);
    res.status(500).json({
      error: "error occur in Signup"
    })
  }
}


const postLogin = async (req,res,next) => {
  try{
    const email = req.body.email;
    const password = req.body.password;   //collecting email and password from the body
   
    if(isstringinvalid(email) || isstringinvalid(password)){
      return res.status(400).json({message: " emailId or password is missing", success: false})
    }
    console.log(password);
  
    const user = await User.findAll({where : {email}})
      if(user.length > 0){
        bcrypt.compare(password, user[0].password, (err,result) => {
          if(err){
            throw new Error('something went wrong');
          }
          if(result === true){
            res.status(200).json({success: true, message: "User logged in Successfully"})
          }
          else{
            return res.status(400).json({success:false, message: "Password is incorrect"})
          }
        })
      }
      else{
        return res.status(404).json({success: false, message: "User Does not exist"})
      }
  }
  catch(err){
    console.log("error occur while login",err.stack);
    res.status(500).json({success:false, message: err})
  }
}

module.exports = {
  postSignup,
  postLogin
}