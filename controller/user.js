const User = require('../model/userModel');

const postSignup = async (req,res,next) => {

  try{
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;

    await User.create({
      fullName: fullName,
      email: email,
      password: password
    })
    res.status(201).json({message: 'Sign Up Successful'});
  }
  catch(err){
    console.log("error occur in Add-user",JSON.stringify(err));
    res.status(500).json({
      error: "error occur in Add-user"
    })
  }
}


module.exports = {
  postSignup
}