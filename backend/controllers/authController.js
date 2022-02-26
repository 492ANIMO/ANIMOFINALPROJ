// const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
//config
const config = require('../config/index');

// import models
const User = require('../models/user');
const Client = require('../models/client');
const Staff = require('../models/staff');


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email: email, role: {$ne: 'client'}});
    console.log('user: '+user);
    if(!user){
      const error = new Error('ไม่พบผู้ใช้งานในระบบ');
      error.statusCode = 404;
      throw error;
    }
    // check password
    const isValid = bcrypt.compareSync(password, user.password);
    if(!isValid){
      const error = new Error('รหัสผ่านไม่ถูกต้อง');
      error.statusCode = 401;
      throw error;
    }

    // generate token
    const token = await jwt.sign({
      id: user._id,
      role: user.role
    }, config.SECRET, {expiresIn: '1 days'})

     //decode วันหมดอายุ
     const expires_in = jwt.decode(token);

     return res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: 'Bearer'
  }); 
    

  } catch (error) {
    next(error)
  }
}

exports.logout = (req,res, next) => {
  try {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.clearCookie('jwt')
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
    
  } catch (error) {
    next(error)
  }
  
};

// login client
exports.loginClient = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email: email, role: 'client'});
    console.log('user: '+user);
    if(!user){
      const error = new Error('ไม่พบผู้ใช้งานในระบบ');
      error.statusCode = 404;
      throw error;
    }
    // check password
    const isValid = bcrypt.compareSync(password, user.password);
    if(!isValid){
      const error = new Error('รหัสผ่านไม่ถูกต้อง');
      error.statusCode = 401;
      throw error;
    }

    // generate token
    const token = await jwt.sign({
      id: user._id,
      role: user.role
    }, config.SECRET, {expiresIn: '1 days'})

     //decode วันหมดอายุ
     const expires_in = jwt.decode(token);

     return res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: 'Bearer'
  }); 
    
  } catch (error) {
    next(error)
  }
}

// login google
exports.googleAuth = async (req, res, next) => {
  try {

  console.log('redirected', req.user)

  // generate token
  const token = jwt.sign({
    id: req.user._id,
    role: req.user.role
  }, config.SECRET, {expiresIn: '1 days'})

  // decode วันหมดอายุ
  const expires_in = jwt.decode(token);

    // res.redirect('http://localhost:8080/');
    console.log(` access_token: ${token}`)
    res.redirect('http://localhost:8081/mobile/google-auth/?token=' + token);
    
    // return res.status(200).json({
    //   access_token: token,
    //   expires_in: expires_in.exp,
    //   token_type: 'Bearer'
    // }); 
    
  } catch (error) {
    next(error)
  }
}

