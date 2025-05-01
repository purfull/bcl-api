const jwt = require("jsonwebtoken");
const Cart = require('./model')
const client = require('../redis.config')


const getCartById = async (req, res) => {
    const { userId } = req.params;
    try {
        const carts = await Cart.findAll({
            where: {
                UserId: userId,
                status: 'active'
            },
            include: [{
                model: CartItem
            }]
        });

        console.log("carts", carts)
        res.status(200).json({ success: true, message: "Created Successfully" });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ success: false, message: "Failed to retrieve user" });
    }
}

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {

        const newCart = await Cart.create({
            UserId: userId
        });

        await CartItem.bulkCreate([
            {
                cartId: cart.id,
                productId: productId,
                quantity: quantity
            }
        ]);
        res.json({ success: true, message: "user created successfully", data: newCart })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ success: false, message: "failed to create user" });
    }
}

const updateCart = async (req, res) => {
    const { cartIds, qty } = req.body;

    try {

        const cartData = await CartItem.update(
            { quantity: qty }, // or any field you want to change
            { where: { cartId: cartIds } }
        );

        res.json({ success: true, message: "cart updated successfully", data: cartData })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ success: false, message: "failed to update user" });
    }
}




module.exports = {
    getCartById,
    updateCart,
    addToCart
};

