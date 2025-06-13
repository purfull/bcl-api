const { Op } = require('sequelize');
const Delivery = require('./model'); 

const getAllDeliveries = async (req, res) => {
    try {
        const { name, email, status } = req.query;
        const whereClause = {};

        if (name) {
            whereClause.name = { [Op.like]: `%${name}%` };
        }

        if (email) {
            whereClause.email = { [Op.like]: `%${email}%` };
        }

        if (status) {
            whereClause.status = status;
        }

        const deliveries = await Delivery.findAll({ where: whereClause });
        res.status(200).json({ success: true, data: deliveries });
    } catch (error) {
        console.error("Error fetching deliveries:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve deliveries" });
    }
};


const getDeliveryById = async (req, res) => {
    const { id } = req.params;

    try {
        const delivery = await Delivery.findOne({ where: { id } });
        if (!delivery) return res.status(404).json({ success: false, message: "Delivery not found" });

        res.status(200).json({ success: true, data: delivery });
    } catch (error) {
        console.error("Error fetching delivery by ID:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve delivery" });
    }
};


const createDelivery = async (req, res) => {
    const { name, phone, email, password, country, state, delivery_areas, status } = req.body;

    try {
        const newDelivery = await Delivery.create({ name, phone, email, password, country, state, delivery_areas, status });
        res.status(201).json({ success: true, message: "Delivery created successfully", data: newDelivery });
    } catch (error) {
        console.error("Error creating delivery:", error);
        res.status(500).json({ success: false, message: "Failed to create delivery" });
    }
};


const updateDelivery = async (req, res) => {
    const { id } = req.params;
    const { name, phone, email, password, country, state, delivery_areas, status } = req.body;

    try {
        const [updated] = await Delivery.update(
            { name, phone, email, password, country, state, delivery_areas, status },
            { where: { id } }
        );

        if (updated === 0) return res.status(404).json({ success: false, message: "Delivery not found" });

        res.json({ success: true, message: "Delivery updated successfully" });
    } catch (error) {
        console.error("Error updating delivery:", error);
        res.status(500).json({ success: false, message: "Failed to update delivery" });
    }
};


const deleteDelivery = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Delivery.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ success: false, message: "Delivery not found" });

        res.json({ success: true, message: "Delivery deleted successfully" });
    } catch (error) {
        console.error("Error deleting delivery:", error);
        res.status(500).json({ success: false, message: "Failed to delete delivery" });
    }
};

module.exports = {
    getAllDeliveries,
    getDeliveryById,
    createDelivery,
    updateDelivery,
    deleteDelivery
};
