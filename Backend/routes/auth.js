const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator'); // To check the validation of the input data
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "NakxtraisNakshatra"

//ROUTE-1: Create a User using: POST "/api/auth/createuser", No login required
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must contain at least 5 characters').isLength({ min: 5 })
], async (req, res)=>{
    let success = false;
    // If there are errors, return bad requests and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      // Check whether the user with this email already exist
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({success, error: "Email already exist!!"});
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass
        })
        
        
        // Giving the JWT token in response
        data = {
          user:{
            id: user.id
          }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error Occured");
    }
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    // res.json({error: 'Email-id already exist', message: err.message})})
    
    
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);

    
  })

// ROUTE-2: Authenticate a USer using POST '/api/auth/login': No login required
  router.post('/login',[
      body('email', 'Enter a valid email').isEmail(),
      body('password', 'Password cannot be blank').exists()
  ], async (req, res)=>{
      let success = false;
      // If there are errors, return bad requests and the errors 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {email, password} = req.body;
      try {
        // Check whether the user with the login email exist or not
        let user = await User.findOne({email});
        if(!user){
          return res.status(400).json({error: "Invalid Credentials!!"});
        }

        // Check whether the password corresponding to email is correct or not
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
          return res.status(400).json({error: "Invalid Credentials!!"});
        }

        // Giving the JWT token in response
          data = {
            user:{
              id: user.id
            }
          }
          const authtoken = jwt.sign(data, JWT_SECRET);
          success = true;
          res.json({success, authtoken});
        
      } catch (error) {
        // IF any error occured
        console.error(error.message);
        res.status(500).send("Error Occured");
      }

    })

//ROUTE-3: Get LoggedIn user details using: POST "/api/auth/getuser". Login required
  router.post('/getuser', fetchuser, async(req, res)=>{
    try {
      // getting the user id from the data
      userId = req.user.id;
      // Getting the user data by id excluding password
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error Occured");
    }

  })

module.exports = router;