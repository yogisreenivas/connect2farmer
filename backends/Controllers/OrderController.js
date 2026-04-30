const OrderModel = require('../Models/Order');

const createOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, shippingAddress } = req.body;
        
        const newOrder = new OrderModel({
            userId,
            items,
            totalAmount,
            shippingAddress
        });
        
        await newOrder.save();
        
        res.status(201).json({
            message: "Order placed successfully",
            success: true,
            data: newOrder
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await OrderModel.find({ userId }).populate('items.productId');
        
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findById(id).populate('items.productId');
        
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
                success: false
            });
        }
        
        res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        
        if (!updatedOrder) {
            return res.status(404).json({
                message: "Order not found",
                success: false
            });
        }
        
        res.status(200).json({
            message: "Order status updated",
            success: true,
            data: updatedOrder
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus
};
