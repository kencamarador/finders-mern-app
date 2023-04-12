const User = require('../models/User');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '2d'})  //returnt he token. Expire in 2 days
}
//login user

const login = async (req, res) => {
    const {email, password} = req.body
    

    try {
        const user = await User.login(email, password);
          
        //create a token
        const token = createToken(user._id)
        res.status(200).json({ email, token });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };


//signup user
const register = async (req, res) => {
    const { email, password } = req.body
  
    // Check if password is not undefined or null
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
  
    try {
      const user = await User.signup(email, password);
        
      //create a token
      const token = createToken(user._id)
      res.status(200).json({ email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

module.exports = {
    login,
    register
}