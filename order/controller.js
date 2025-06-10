// const { Order, OrderItem, User, Product } = require('../models');
const { where } = require('sequelize');
const Order = require('./model')

module.exports = {

  // GET /api/orders
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.findAll({
        // include: [
        //   { model: OrderItem, as: 'items', include: ['product'] },
        //   { model: User, as: 'customer' }
        // ]
      });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  },

  // GET /api/orders/:id
  getOrderById: async (req, res) => {
    const {id} = req.params
    try {
      const order = await Order.findOne(req.params.id, {
        // include: [
        //   { model: OrderItem, as: 'items', include: ['product'] },
        //   { model: User, as: 'customer' }
        // ]
        where: { id: id } 
      });
      if (!order) return res.status(404).json({ error: 'Order not found' });
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  },

  // POST /api/orders
  createOrder: async (req, res) => {
    const { customer_id, shipping_address, billing_address, items } = req.body;
    try {
      const order = await Order.create({
        customer_id,
        shipping_address,
        billing_address,
        status: 'pending',
        payment_status: 'unpaid'
      });

      const orderItems = items.map(item => ({
        order_id: order.order_id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }));

      await OrderItem.bulkCreate(orderItems);

      res.status(201).json({ message: 'Order created', order_id: order.order_id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create order' });
    }
  },

  // PATCH /api/orders/:id
  updateOrder: async (req, res) => {
    const { status, payment_status } = req.body;
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) return res.status(404).json({ error: 'Order not found' });

      if (status) order.status = status;
      if (payment_status) order.payment_status = payment_status;
      await order.save();

      res.json({ message: 'Order updated', order });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update order' });
    }
  }

};
