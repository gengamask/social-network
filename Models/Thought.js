const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction.js");

// thought collection
const thoughtsSchema = new Schema(
  {
    // thought document, min 1 char max 280 char
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },
    // current time stamp
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // the user created this thought
    username: {
      type: String,
      required: true,
    },
    // equalivlent to replies
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// virtual that retrives the length of the thought's reactions array field on query
thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtsSchema);
module.exports = Thought;