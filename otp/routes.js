const express = require('express');

const router = express.Router();
const client = require('../redis.config')


router.post('/send-otp', async (req, res) => {
    const { id } = req.body; 

    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }

    
    const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
    
    
    const storeOTP = async (id, otp) => {
        await client.setEx(`otp:${id}`, 300, otp);
    };

    const otp = generateOTP(); 
    await storeOTP(id, otp); 

    res.json({ message: 'OTP sent successfully', otp }); 
});


router.post('/verify-otp', async (req, res) => {
    const { id, otp } = req.body;

    if (!id || !otp) {
        return res.status(400).json({ error: 'id and OTP are required' });
    }

    try {
        const storedOTP = await client.get(`otp:${id}`); 

        if (!storedOTP) {
            return res.status(400).json({ error: 'OTP expired or not found' });
        }

        if (storedOTP !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        await client.del(`otp:${id}`);

        res.json({ message: 'OTP verified successfully' });

    } catch (error) {
        console.error('Redis Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
