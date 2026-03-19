import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Food from './models/foodModel.js';

dotenv.config();

connectDB();

const foods = [
  {
    name: 'Classic Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella cheese, and basil leaves on our signature wood-fired crust.',
    price: 399.00,
    category: 'Pizza',
    image: '/images/foods/pizza.jpg',
    rating: 4.8,
    numReviews: 124,
  },
  {
    name: 'Gourmet Beef Burger',
    description: '100% Angus beef patty, melted cheddar, crisp lettuce, tomato, and our secret sauce on a toasted brioche bun.',
    price: 249.00,
    category: 'Burger',
    image: '/images/foods/burger.jpg',
    rating: 4.9,
    numReviews: 89,
  },
  {
    name: 'Loaded Peri-Peri Fries',
    description: 'Crispy golden french fries tossed in spicy peri-peri seasoning and loaded with cheese sauce.',
    price: 149.00,
    category: 'French Fries',
    image: '/images/foods/fries.jpg',
    rating: 4.8,
    numReviews: 320,
  },
  {
    name: 'Crispy Fried Chicken',
    description: 'Golden, crunchy fried chicken pieces marinated in an authentic blend of herbs and spices.',
    price: 349.00,
    category: 'Fried Chicken',
    image: '/images/foods/chicken.jpg',
    rating: 4.7,
    numReviews: 210,
  },
  {
    name: 'Creamy Alfredo Pasta',
    description: 'Penne pasta tossed in a rich and creamy garlic parmesan sauce, topped with fresh parsley.',
    price: 299.00,
    category: 'Pasta',
    image: '/images/foods/pasta.jpg',
    rating: 4.7,
    numReviews: 75,
  },
  {
    name: 'Grilled Club Sandwich',
    description: 'Triple-decker sandwich loaded with grilled chicken, cheese, lettuce, tomato, and mayo.',
    price: 199.00,
    category: 'Sandwich',
    image: '/images/foods/sandwich.jpg',
    rating: 4.5,
    numReviews: 112,
  },
  {
    name: 'Cold Coffee',
    description: 'Premium cold brew coffee mixed with milk and rich caramel syrup, served over ice.',
    price: 149.00,
    category: 'Cold Coffee',
    image: '/images/foods/cold-coffee.jpg',
    rating: 4.6,
    numReviews: 85,
  },
  {
    name: 'Chocolate Milkshake',
    description: 'Thick and creamy double chocolate milkshake topped with whipped cream and chocolate drizzle.',
    price: 199.00,
    category: 'Milkshake',
    image: '/images/foods/milkshake.jpg',
    rating: 4.9,
    numReviews: 156,
  },
  {
    name: 'Red Velvet Cake',
    description: 'Moist and fluffy layers of red velvet cake generously frosted with smooth cream cheese icing.',
    price: 249.00,
    category: 'Dessert',
    image: '/images/foods/dessert.jpg',
    rating: 4.9,
    numReviews: 210,
  },
  {
    name: 'Classic Cola',
    description: 'Chilled and refreshing classic cola soft drink served with ice and lemon.',
    price: 79.00,
    category: 'Soft Drink',
    image: '/images/foods/soft-drink.jpg',
    rating: 4.5,
    numReviews: 54,
  }
];

const importData = async () => {
  try {
    await Food.deleteMany();
    await Food.insertMany(foods);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
