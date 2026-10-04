import Food from '../models/foodModel.js';

// @desc    Fetch all foods
// @route   GET /api/foods
// @access  Public
const getFoods = async (req, res) => {
  const foods = await Food.find({});
  res.json(foods);
};

// @desc    Fetch single food
// @route   GET /api/foods/:id
// @access  Public
const getFoodById = async (req, res) => {
  const food = await Food.findById(req.params.id);

  if (food) {
    res.json(food);
  } else {
    res.status(404).json({ message: 'Food not found' });
  }
};

// @desc    Create a food item
// @route   POST /api/foods
// @access  Private/Admin
const createFood = async (req, res) => {
  const { name, price, description, image, category } = req.body;

  const food = new Food({
    name,
    price,
    description,
    image,
    category,
  });

  const createdFood = await food.save();
  res.status(201).json(createdFood);
};

// @desc    Update a food item
// @route   PUT /api/foods/:id
// @access  Private/Admin
const updateFood = async (req, res) => {
  const { name, price, description, image, category } = req.body;

  const food = await Food.findById(req.params.id);

  if (food) {
    food.name = name;
    food.price = price;
    food.description = description;
    food.image = image;
    food.category = category;

    const updatedFood = await food.save();
    res.json(updatedFood);
  } else {
    res.status(404).json({ message: 'Food not found' });
  }
};

// @desc    Delete a food item
// @route   DELETE /api/foods/:id
// @access  Private/Admin
const deleteFood = async (req, res) => {
  const food = await Food.findById(req.params.id);

  if (food) {
    await Food.deleteOne({ _id: req.params.id });
    res.json({ message: 'Food removed' });
  } else {
    res.status(404).json({ message: 'Food not found' });
  }
};

export { getFoods, getFoodById, createFood, updateFood, deleteFood };
