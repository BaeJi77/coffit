var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags : [User]
 *     description: show all User
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *
 * /users/{id}:
 *    get:
 *      tags: [User]
 *      description: show user object using user id
 *      produces:
 *       - application/json
 *
 */

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/**
 * @swagger
 * tags:
 *   name: User
 *   description: 사용자 정보 가져오기
 */

module.exports = router;
