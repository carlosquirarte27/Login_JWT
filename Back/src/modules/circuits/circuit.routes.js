const router = require('express').Router();
const circuitController = require('./circuits.controller');

/**
 * @swagger
 *   /api/Circuits:
 *     get:
 *       tags:
 *       - Circuits
 *       description: Get all Circuits
 *       responses:
 *         200:
 *           description: Array with a list of channels
 */

router.get('/Circuits',circuitController.getAll);
 /**
  * @swagger
  *   /api/Circuits/{id}:
  *     get:
  *       tags:
  *       - Circuits
  *       description: Get one channel by ID
  *       parameters:
  *         - in: path
  *           name: id
  *           required: true
  *           description: Circuit's unique ID
  *       responses:
  *         200:
  *           description: An object with a single message's data
  */
router.get('/Circuits/:id',circuitController.getOne);
  /**
  * @swagger
  *   /api/Circuits/:
  *     post:
  *       tags:
  *       - Circuits
  *       description: Create a Circuit
  *       parameters:
  *         - in: body
  *           name: name
  *           required: true
  *           description: Name of the circuit
  *         - in: body
  *           name: address
  *           required: true
  *           description: The real address of the circuit
  *         - in: body
  *           name: phone
  *           required: true
  *           description: a phone number to contact with the circuit managers
  *         - in: body
  *           name: distance
  *           required: true
  *           description: The circuit distance, measured in kilometers
  *       responses:
  *         200:
  *           description: An object with a single message's data
  */
router.post('/Circuits',circuitController.create);
router.delete('/circuits/:id',circuitController.delete);
router.put('/circuits',circuitController.update);
module.exports = router;