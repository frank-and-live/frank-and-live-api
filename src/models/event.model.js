const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { eventTypes } = require('../config/events');
const { object } = require('joi');

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
    facebookAccount: {
      type: Object,
      required: false,
    },
    starts: {
      type: Date,
      required: true,
    },
    ends: {
      type: Date,
      required: true,
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
