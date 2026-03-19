import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    console.log("Received order items in backend:", orderItems);

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    } else {
      // Strictly sanitize order items to schema
      const sanitizedOrderItems = orderItems.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        product: item.product
      }));

      // Strictly sanitize shipping address to schema
      const sanitizedShippingAddress = {
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country
      };

      const order = new Order({
        orderItems: sanitizedOrderItems,
        user: req.user._id,
        shippingAddress: sanitizedShippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      // Optionally configure cart to empty itself after placing order
      await Cart.findOneAndUpdate(
        { user: req.user._id },
        { cartItems: [] }
      );

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

export { addOrderItems, getMyOrders };
