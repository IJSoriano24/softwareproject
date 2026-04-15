const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [
    {
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true,
        unique: true 
      },
      name: { type: String },      
      quantity: { type: Number, default: 1 },
      mealSource: { type: String }   
    }
  ]
}, {
  collection: 'shopping_list',
  timestamps: true
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);