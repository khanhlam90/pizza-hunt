const { Schema, model } = require('mongoose');

//import the dateFormat() fcn to this file to use for createAt getter
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: true,
      trim: true
    },

    createdBy: {
      type: String,
      required: true,
      trim: true
    },

    createdAt: {
      type: Date,
      default: Date.now,
      //getter to transforms/formats the date data
      get: (createAtVal) => dateFormat(createAtVal)
    },
      
    size: {
      type: String,
      required: true,
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
      default: 'Large'
    },

    toppings: [],

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments
// PizzaSchema.virtual('commentCount').get(function() {
//   return this.comments.length;
// });

// update the pizza's virtual commentCount so it includes all replies as well
// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});


// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;