
const { userInfo } = require('../controller/user.conroller');
const { isValidUser } = require('../middleware/auth.middleware');

const UserRoutes = require('express').Router();

UserRoutes.get("/getData",isValidUser,userInfo)

module.exports = {UserRoutes};