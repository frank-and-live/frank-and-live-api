const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEvent = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().valid('facebook', 'instagram'),
    account: Joi.string(),
    starts: Joi.date().required(),
    ends: Joi.date().required(),
    pageId: Joi.string().required(),
    pageAccessToken: Joi.string().required(),
  }),
};

const getEvents = {
  query: Joi.object().keys({
    name: Joi.string(),
    pageId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEvent = {
  params: Joi.object().keys({
    user: Joi.string().custom(objectId),
    eventId: Joi.string().custom(objectId),
  }),
};

const updateEvent = {
  params: Joi.object().keys({
    user: Joi.required().custom(objectId),
    eventId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      type: Joi.string().required().valid('facebook', 'instagram'),
      starts: Joi.date().required(),
      ends: Joi.date().required(),
      pageId: Joi.string().required(),
      pageAccessToken: Joi.string().required(),
    })
    .min(1),
};

const deleteEvent = {
  params: Joi.object().keys({
    user: Joi.string().custom(objectId),
    eventId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
