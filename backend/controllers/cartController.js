import Cart from '../models/cartModel.js';
import Food from '../models/foodModel.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getUserCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [],
    });
  }

  res.json(cart);
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
  const { foodId, qty } = req.body;

  const food = await Food.findById(foodId);
  if (!food) {
    return res.status(404).json({ message: 'Food item not found' });
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      cartItems: [],
    });
  }

  const existingItem = cart.cartItems.find(
    (item) => item.food.toString() === foodId
  );

  if (existingItem) {
    existingItem.qty += Number(qty);
  } else {
    cart.cartItems.push({
      food: food._id,
      name: food.name,
      image: food.image,
      price: food.price,
      qty: Number(qty),
    });
  }

  await cart.save();
  res.status(201).json(cart);
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
const updateCartItem = async (req, res) => {
  const { foodId, qty } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const existingItem = cart.cartItems.find(
    (item) => item.food.toString() === foodId
  );

  if (existingItem) {
    existingItem.qty = Number(qty);
    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Item not found in cart' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove
// @access  Private
const removeFromCart = async (req, res) => {
  const { foodId } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.cartItems = cart.cartItems.filter(
    (item) => item.food.toString() !== foodId
  );

  await cart.save();
  res.json(cart);
};

export { getUserCart, addToCart, updateCartItem, removeFromCart };
