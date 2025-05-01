const User = require('./user/model');
const Product = require('./products/model');
const Cart = require('./cart/model');
const CartItem = require('./cartItem/model');

// Associations
User.hasMany(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);
