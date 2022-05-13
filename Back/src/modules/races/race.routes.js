const router = require('express').Router();
const { isRegularExpressionLiteral } = require('typescript');
const raceController = require('./races.controller');
const racesController = require('./races.controller');
/**
 * @swagger
 *   /api/Races:
 *     get:
 *       tags:
 *       - Races
 *       description: Get all Races
 *       responses:
 *         200:
 *           description: Array with a list of races
 */
router.get('/races',racesController.getAll);
/**
  * @swagger
  *   /api/Races/{id}:
  *     get:
  *       tags:
  *       - Races
  *       description: Get one Race by ID
  *       parameters:
  *         - in: path
  *           name: id
  *           required: true
  *           description: Race's unique ID
  *       responses:
  *         200:
  *           description: An object with a single race's data
  */
router.get('/races/:id',racesController.getOne);
  /**
  * @swagger
  *   /api/Races/:
  *     post:
  *       tags:
  *       - Races
  *       description: Create a new race
  *       parameters:
  *         - in: header
  *           name: drivers
  *           required: true
  *           description: Save the drivers who will participate
  *         - in: header
  *           name: number_of_laps
  *           required: true
  *           description: Number of laps
  *         - in: header
  *           name: date
  *           required: true
  *           description: Race's date
  *         - in: header
  *           name: name
  *           required: true
  *           description: The Race Name
  *         - in: header
  *           name: circuit
  *           required: true
  *           description: The name of the circuit where the race will take place
  *       responses:
  *         200:
  *           description: Create a new database entry with a race result info
  */
router.post('/races',racesController.create);
router.delete('/races/:id',racesController.delete);
router.put('/races',racesController.update)
router.put('/races/:id',racesController.joinRace);
router.post('/races/:id',raceController.leftRace)
module.exports = router;