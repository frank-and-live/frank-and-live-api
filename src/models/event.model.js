const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { eventTypes } = require('../config/events');

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [eventTypes.FACEBOOK, eventTypes.INSTAGRAM],
      required: false,
    },
    account: {
      type: String,
      required: false,
      trim: true,
    },
    starts: {
      type: Date,
      required: true,
    },
    ends: {
      type: Date,
      required: true,
    },
    pageId: {
      type: String,
      required: true,
      trim: true
    },
    pageAccessToken: {
      type: String,
      required: true,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
eventSchema.plugin(toJSON);
eventSchema.plugin(paginate);

/**
 * @typedef Event
 */
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
