const { getAllUsers, registerUser, userLogin } = require('../controller/auth.controller');
const { isValidUser } = require('../middleware/auth.middleware');

const AuthRoutes = require('express').Router();


// AuthRoutes.get('/',isValidUser,getAllUsers);
AuthRoutes.post("/addUser",registerUser)
AuthRoutes.post("/login",userLogin)


module.exports = {AuthRoutes};