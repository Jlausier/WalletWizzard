const router = require('express').Router();
const userRouter = require('./userRoutes');

router.use('/user', userRouter)

module.exports = router