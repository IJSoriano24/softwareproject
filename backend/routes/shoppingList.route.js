const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const ShoppingList = require('../models/ShoppingList');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

//get
router.get('/', async (req, res, next) => {
  try {
    let list = await ShoppingList.findOne({ user: req.user.id }).populate('items.ingredient');
    if (!list) list = await ShoppingList.create({ user: req.user.id, items: [] });
    res.json(list);
  } catch (error) {
    next(error);
  }
});

//post
router.post('/add-meal/:mealId', async (req, res, next) => {
  try {
    const meal = await Meal.findById(req.params.mealId).populate('ingredients');
    if (!meal) return res.status(404).json({ message: 'Meal not found' });

    let list = await ShoppingList.findOne({ user: req.user.id });
    if (!list) list = await ShoppingList.create({ user: req.user.id, items: [] });

    meal.ingredients.forEach((ing) => {
      const alreadyAdded = list.items.some(
        (item) => item.ingredient.toString() === ing._id.toString()
      );
      if (!alreadyAdded) {
        list.items.push({
          ingredient: ing._id,
          name: ing.name,
          quantity: 1,
          mealSource: meal.name
        });
      }
    });

    await list.save();
    res.json(list);
  } catch (error) {
    next(error);
  }
});

//put
router.put('/item/:itemId', async (req, res, next) => {
  try {
    const list = await ShoppingList.findOne({ user: req.user.id });
    if (!list) return res.status(404).json({ message: 'List not found' });

    const item = list.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity = req.body.quantity;
    await list.save();
    res.json(list);
  } catch (error) {
    next(error);
  }
});

//delete all
router.delete('/all', async (req, res, next) => {
  try {
    const list = await ShoppingList.findOne({ user: req.user.id });
    if (!list) return res.status(404).json({ message: 'List not found' });

    list.items = [];
    await list.save();
    res.json({ message: 'Shopping list cleared' });
  } catch (error) {
    next(error);
  }
});

//delete
router.delete('/item/:itemId', async (req, res, next) => {
  try {
    const list = await ShoppingList.findOne({ user: req.user.id });
    if (!list) return res.status(404).json({ message: 'List not found' });

    list.items = list.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );
    await list.save();
    res.json(list);
  } catch (error) {
    next(error);
  }
});



module.exports = router;