const { Schema, Types } = require("mongoose");

// reaction collection
const reactionSchema = new Schema(
  {
    // reaction id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // document for reaction text, max 280 char
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    // the user created this reaction
    username: {
      type: String,
      required: true,
    },
    // current time stamp
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        const newDate = new Date(date);
        return `${
          newDate.getMonth() + 1
        }-${newDate.getDate()}-${newDate.getFullYear()}`;
      },
    },
  },
  {
    toJson: {
      getters: true,
    },
    id: false,
  }
);
module.exports = reactionSchema;