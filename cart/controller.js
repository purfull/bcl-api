const { Op } = require('sequelize');
const Cart = require('./model');
const Product = require('../products/model');

const getAllCartItems = async (req, res) => {
    try {
        const { userId, productId } = req.query;
        const whereClause = {};

        if (userId) {
            whereClause.userId = userId;
        }

        if (productId) {
            whereClause.productId = productId;
        }

        const cartItems = await Cart.findAll({
            where: whereClause,
            include: [{ model: Product, attributes: ['name', 'price', 'thumbnailImage'] }]
        });

        res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve cart items" });
    }
};


const getCartItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const cartItem = await Cart.findOne({
            where: { id },
            include: [{ model: Product, attributes: ['name', 'price', 'image'] }]
        });

        if (!cartItem) return res.status(404).json({ success: false, message: "Cart item not found" });

        res.status(200).json({ success: true, data: cartItem });
    } catch (error) {
        console.error("Error fetching cart item by ID:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve cart item" });
    }
};


const createCartItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const existing = await Cart.findOne({ where: { userId, productId } });

        if (existing) {
            existing.quantity += quantity || 1;
            await existing.save();
            return res.status(200).json({ success: true, message: "Cart updated", data: existing });
        }

        const newCartItem = await Cart.create({ userId, productId, quantity });
        res.status(201).json({ success: true, message: "Cart item added", data: newCartItem });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Failed to add to cart" });
    }
};


const updateCartItem = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const [updated] = await Cart.update({ quantity }, { where: { id } });

        if (updated === 0) return res.status(404).json({ success: false, message: "Cart item not found" });

        res.json({ success: true, message: "Cart item updated successfully" });
    } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({ success: false, message: "Failed to update cart item" });
    }
};


const deleteCartItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Cart.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ success: false, message: "Cart item not found" });

        res.json({ success: true, message: "Cart item deleted successfully" });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({ success: false, message: "Failed to delete cart item" });
    }
};


const clearCartForUser = async (req, res) => {
    const { userId } = req.params;

    try {
        await Cart.destroy({ where: { userId } });
        res.json({ success: true, message: "Cart cleared for user" });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ success: false, message: "Failed to clear cart" });
    }
};

module.exports = {
    getAllCartItems,
    getCartItemById,
    createCartItem,
    updateCartItem,
    deleteCartItem,
    clearCartForUser
};
