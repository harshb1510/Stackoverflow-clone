import mongoose from 'mongoose';
import User from '../models/auth.js';


export const subscribe = async (req, res) => {
    const { id: _id } = req.params;
    const user = await User.findById(_id);
    if (!user) {
        return res.status(404).send("User unavailable...");
    }

    try {
        const  amount  = (req.body.data.amount)/100;
        if (amount == 100) {
            user.plan = "silver";
        } else if (amount == 1000) {
            user.plan = "gold";
        }
        await user.save();
        res.status(200).json({ message: `Successfully subscribed to ${user.plan} plan.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
