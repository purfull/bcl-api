const User = require('./user/model');
const Product = require('./products/model');
const Cart = require('./cart/model');
const CartItem = require('./cartItem/model');
const Order = require('./order/model');
const OrderItem = require('./orderItem/model');

// Associations
User.hasMany(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);


// User and Order
User.hasMany(Order, {
    foreignKey: 'customer_id',
    as: 'orders'
});
Order.belongsTo(User, {
    foreignKey: 'customer_id',
    as: 'customer'
});

// Order and OrderItem
Order.hasMany(OrderItem, {
    foreignKey: 'order_id',
    as: 'items'
});
OrderItem.belongsTo(Order, {
    foreignKey: 'order_id',
    as: 'order'
});

// Product and OrderItem
Product.hasMany(OrderItem, {
    foreignKey: 'product_id',
    as: 'orderItems'
});
OrderItem.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});
