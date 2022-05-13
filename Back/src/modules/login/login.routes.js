const router = require('express').Router();
const LogInController = require('./login.controller');



router.post('/Login',LogInController.updateOne);
router.put('/Login',LogInController.checkGoogleToken)
//router.delete('./users',userController.delete);
module.exports = router;