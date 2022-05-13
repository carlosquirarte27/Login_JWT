const router = require('express').Router();
const race_resultsController = require('./race_results.controller');

/**
 * @swagger
 *   /api/Race_results:
 *     get:
 *       tags:
 *       - Results
 *       description: Get all Rece Results
 *       responses:
 *         200:
 *           description: Array with a list of channels
 */
router.get('/race_results',race_resultsController.getAll);
/**
  * @swagger
  *   /api/Race_results/{id}:
  *     get:
  *       tags:
  *       - Results
  *       description: Get the results of one race 
  *       parameters:
  *         - in: path
  *           name: id
  *           required: true
  *           description: Race's unique ID
  *       responses:
  *         200:
  *           description: An object with a single message's data
  */
router.get('/race_results/:id',race_resultsController.getOne);
  /**
  * @swagger
  *   /api/Race_Results/:
  *     post:
  *       tags:
  *       - Results
  *       description: Save a Race Result
  *       parameters:
  *         - in: header
  *           name: results
  *           required: true
  *           description: Save the positions of the drivers
  *         - in: header
  *           name: number_of_laps
  *           required: true
  *           description: Number of laps
  *         - in: header
  *           name: race_id
  *           required: true
  *           description: Race ID
  *         - in: header
  *           name: race_name
  *           required: true
  *           description: The Race Name
  *       responses:
  *         200:
  *           description: Create a new database entry with a race result info
  */
router.post('/race_results',race_resultsController.create);
//router.delete('./users',userController.delete);
module.exports = router;