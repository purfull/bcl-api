const jwt = require("jsonwebtoken");
const Cart = require('./model')
const client = require('../redis.config')
const CartItem = require('../cartItem/model')
const Product = require('../products/model')
// const db = require('./model')


const getCartById = async (req, res) => {
    const { userId } = req.body.body;
    try {
        console.log("userId==>", userId)
        const carts = await Cart.sequelize.query(
            `
            select c.UserId as userId, c.id as cartId, ci.quantity as quantity, ci.ProductId as productId,
                p.name as productName, p.category as category, p.description as description, p.price as price,
                p.offer_price as offer_price, p.quantity_available as available_quantity
            from carts c 
            left join cart_items ci 
                on c.id = ci.CartId 
                and ci.status = 'active'
            left join user u
                on u.id = c.UserId 
                and c.status = 'active'
            left join products p 
                on p.id = ci.ProductId
            where c.UserId = ${userId} and c.status = 'active';`
        )

        console.log("carts", carts[0])
        res.status(200).json({ success: true, message: "Created Successfully", data: carts[0] });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ success: false, message: "Failed to retrieve user" });
    }
}

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body.body;

    try {
        console.log("req.body", req.body)
        const userCartExist = await Cart.findOne({
            where: {
                UserId: userId,
                status: 'active'
            }
        });

        if(userCartExist) {
            const updatedCart = await CartItem.create({
                CartId: userCartExist.id,
                ProductId: productId,
                quantity: quantity
            });
            
            res.json({ success: true, message: "Cart updated successfully"})
        }

        const newCart = await Cart.create({
            UserId: userId
        });

        await CartItem.bulkCreate([
            {
                CartId: newCart.id,
                ProductId: productId,
                quantity: quantity
            }
        ]);
        res.json({ success: true, message: "cart created successfully"})

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

