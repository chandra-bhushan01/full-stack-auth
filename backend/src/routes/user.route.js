
const { userInfo, updateInfo } = require('../controller/user.conroller');
const { isValidUser } = require('../middleware/auth.middleware');

const UserRoutes = require('express').Router();

UserRoutes.get("/getData",isValidUser,userInfo)
UserRoutes.post('/setData',isValidUser,updateInfo)

module.exports = {UserRoutes};