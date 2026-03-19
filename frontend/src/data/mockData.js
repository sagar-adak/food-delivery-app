export const categories = [
  { id: 'all', name: 'All' },
  { id: 'Pizza', name: 'Pizza' },
  { id: 'Burger', name: 'Burger' },
  { id: 'Pasta', name: 'Pasta' },
  { id: 'Sandwich', name: 'Sandwich' },
  { id: 'French Fries', name: 'French Fries' },
  { id: 'Fried Chicken', name: 'Fried Chicken' },
  { id: 'Cold Coffee', name: 'Cold Coffee' },
  { id: 'Milkshake', name: 'Milkshake' },
  { id: 'Dessert', name: 'Dessert' },
  { id: 'Soft Drink', name: 'Soft Drink' }
];

export const menuItems = [
  {
    id: 1,
    name: 'Classic Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella cheese, and basil leaves on our signature wood-fired crust.',
    price: 399.00,
    category: 'Pizza',
    image: '/images/foods/pizza.jpg',
    rating: 4.8,
    reviews: 124,
    popular: true
  },
  {
    id: 2,
    name: 'Gourmet Beef Burger',
    description: '100% Angus beef patty, melted cheddar, crisp lettuce, tomato, and our secret sauce on a toasted brioche bun.',
    price: 249.00,
    category: 'Burger',
    image: '/images/foods/burger.jpg',
    rating: 4.9,
    reviews: 89,
    popular: true
  },
  {
    id: 3,
    name: 'Creamy Alfredo Pasta',
    description: 'Penne pasta tossed in a rich and creamy garlic parmesan sauce, topped with fresh parsley.',
    price: 299.00,
    category: 'Pasta',
    image: '/images/foods/pasta.jpg',
    rating: 4.7,
    reviews: 75,
    popular: false
  },
  {
    id: 4,
    name: 'Grilled Club Sandwich',
    description: 'Triple-decker sandwich loaded with grilled chicken, cheese, lettuce, tomato, and mayo.',
    price: 199.00,
    category: 'Sandwich',
    image: '/images/foods/sandwich.jpg',
    rating: 4.5,
    reviews: 112,
    popular: false
  },
  {
    id: 5,
    name: 'Loaded Peri-Peri Fries',
    description: 'Crispy golden french fries tossed in spicy peri-peri seasoning and loaded with cheese sauce.',
    price: 149.00,
    category: 'French Fries',
    image: '/images/foods/fries.jpg', // Reusing provided images
    rating: 4.8,
    reviews: 320,
    popular: true
  },
  {
    id: 6,
    name: 'Crispy Fried Chicken',
    description: 'Golden, crunchy fried chicken pieces marinated in an authentic blend of herbs and spices.',
    price: 349.00,
    category: 'Fried Chicken',
    image: '/images/foods/chicken.jpg',
    rating: 4.7,
    reviews: 210,
    popular: true
  },
  {
    id: 7,
    name: 'Iced Caramel Coffee',
    description: 'Premium cold brew coffee mixed with milk and rich caramel syrup, served over ice.',
    price: 149.00,
    category: 'Cold Coffee',
    image: '/images/foods/cold-coffee.jpg', // Fallback name
    rating: 4.6,
    reviews: 85,
    popular: false
  },
  {
    id: 8,
    name: 'Chocolate Milkshake',
    description: 'Thick and creamy double chocolate milkshake topped with whipped cream and chocolate drizzle.',
    price: 199.00,
    category: 'Milkshake',
    image: '/images/foods/milkshake.jpg', // Fallback name
    rating: 4.9,
    reviews: 156,
    popular: true
  },
  {
    id: 9,
    name: 'Red Velvet Cake',
    description: 'Moist and fluffy layers of red velvet cake generously frosted with smooth cream cheese icing.',
    price: 249.00,
    category: 'Dessert',
    image: '/images/foods/dessert.jpg', // Reusing provided images
    rating: 4.9,
    reviews: 210,
    popular: true
  },
  {
    id: 10,
    name: 'Classic Cola',
    description: 'Chilled and refreshing classic cola soft drink served with ice and lemon.',
    price: 79.00,
    category: 'Soft Drink',
    image: '/images/foods/soft-drink.jpg', // Reusing provided images
    rating: 4.5,
    reviews: 54,
    popular: false
  }
];
