const { Op } = require('sequelize');
const Order = require('./model');


const getAllOrders = async (req, res) => {
    try {
        const { asign_to, status } = req.query;
        const whereClause = {};

        if (asign_to) {
            whereClause.asign_to = { [Op.like]: `%${asign_to}%` };
        }

        if (status) {
            whereClause.status = status;
        }

        const orders = await Order.findAll({ where: whereClause });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve orders" });
    }
};


const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findOne({ where: { id } });
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve order" });
    }
};


const createOrder = async (req, res) => {
    const { customer_detials, order_detials, asign_to, remarks, status } = req.body;

    try {
        const newOrder = await Order.create({ customer_detials, order_detials, asign_to, remarks, status });
        res.status(201).json({ success: true, message: "Order created successfully", data: newOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: "Failed to create order" });
    }
};


const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { asign_to, remarks, status } = req.body;

    try {
        const [updated] = await Order.update(
            { asign_to, remarks, status },
            { where: { id } }
        );

        if (updated === 0) return res.status(404).json({ success: false, message: "Order not found" });

        res.json({ success: true, message: "Order updated successfully" });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ success: false, message: "Failed to update order" });
    }
};


const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Order.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ success: false, message: "Order not found" });

        res.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ success: false, message: "Failed to delete order" });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
