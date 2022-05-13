const router = require('express').Router();
const userController = require('./users.controller');

/**
 * @swagger
 *   /api/users:
 *     get:
 *       tags:
 *       - Users
 *       description: Get all users
 *       responses:
 *         200:
 *           description: Array with a list of users
 */
router.get('/users',userController.getAll);
/**
 * @swagger
 *   /api/users/{id}:
 *     get:
 *       tags:
 *       - Users
 *       description: Get one user by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The user's unique ID
 *       responses:
 *         200:
 *           description: An object with a single user's data
 */
router.get('/users/:id',userController.getOne);
  /**
  * @swagger
  *   /api/users/:
  *     post:
  *       tags:
  *       - Users
  *       description: create new user
  *       parameters:
  *         - in: header
  *           name: email
  *           required: true
  *           description: The user's email
  *         - in: header
  *           name: name
  *           required: true
  *           description: The username
  *         - in: header
  *           name: birthdate
  *           required: false
  *           description: The user birthdate
  *       responses:
  *         200:
  *           description: An object with a single message's data
  */
router.post('/users',userController.create);

router.delete('/users/:email',userController.delete);

router.put('/users',userController.update)
//router.delete('./users',userController.delete);
module.exports = router;