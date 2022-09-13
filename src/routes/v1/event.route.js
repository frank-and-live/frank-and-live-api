const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const whitelist = require('../../middlewares/whitelist');
const eventValidation = require('../../validations/event.validation');
const eventController = require('../../controllers/event.controller');

const router = express.Router();

router
  .route('/events')
  .get(whitelist(), validate(eventValidation.getEvents), eventController.getEvents)

router
  .route('/users/:user/events')
  .post(auth('manageEvents'), validate(eventValidation.createEvent), eventController.createEvent)
  .get(auth('manageEvents'), validate(eventValidation.getEvents), eventController.getEvents)

router
  .route('/users/:user/events/:eventId')
  .get(auth('manageEvents'), validate(eventValidation.getEvent), eventController.getEvent)
  .patch(auth('manageEvents'), validate(eventValidation.updateEvent), eventController.updateEvent)
  .delete(auth('manageEvents'), validate(eventValidation.deleteEvent), eventController.deleteEvent);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management and retrieval
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     description: TODO
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pageId
 *         schema:
 *           type: string
 *         description: Facebook page id
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Event'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /users/{id}/events:
 *   post:
 *     summary: Create an event
 *     description: Only users can create events.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - starts
 *               - ends
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [facebook, instagram]
 *               starts:
 *                 type: date
 *               ends:
 *                 type: date
 *               pageId:
 *                 type: string
 *               pageAccessToken:
 *                 type: string
 *             example:
 *               name: event name
 *               type: facebook
 *               starts: 11.11.21
 *               ends: 11.11.22
 *               pageId: 342466
 *               pageAccessToken: fd6s7f67ds6fds
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get a list of events
 *     description: Logged in users can fetch only their own events.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Event'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /users/{id}/events/{id}:
 *   get:
 *     summary: Get a event
 *     description: Logged in users can fetch only their own event information.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Event'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
