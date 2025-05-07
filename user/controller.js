const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const UserModel = require('./model')
// const client = require('../redis.config')


const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ success: false, message: "Failed to retrieve users" });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findOne({ where: { id: id } });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ success: false, message: "Failed to retrieve user" });
    }
}

const createNewUser = async (req, res) => {

    const { name, email, password, address, country, zip_code, location } = req.body.body;
    console.log(req.body.body);


    try {

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);
        const user = await UserModel.findOne({ where: { email: email, status: 'active' } })
        console.log("user==>", user)
        if (user) {
            return res.status(400).json({ success: false, message: "user already exists" });
        }
        const newUser = await UserModel.create({ name, email, address, country, zip_code, location, password: hashedPassword })
        res.json({ success: true, message: "user created successfully", data: newUser })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ success: false, message: "failed to create user" });
    }


}

const updateUser = async (req, res) => {
    const { id, name, email, password, address, country, zip_code, location, status } = req.body;
    // const { id } = req.params;

    try {

        const newUser = await UserModel.update(
            { name, email, password, address, country, zip_code, location, status },
            { where: { id: id } })
        res.json({ success: true, message: "user updated successfully", data: newUser })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ success: false, message: "failed to update user" });
    }
}



// const updatePassword = async (req, res) => {
//     const { id, otp, newPassword } = req.body;
//     const { user_id } = req.params;

//     try {
//         if (!id || !otp || !newPassword) {
//             return res.status(400).json({ success: false, message: 'id, otp, and new password are required' });
//         }

//         const storedOtp = await client.get(`otp:${id}`);

//         if (!storedOtp) {
//             return res.status(400).json({ success: false, message: 'otp expired or invalid' });
//         }

//         if (storedOtp !== otp) {
//             return res.status(400).json({ success: false, message: 'incorrect otp' });
//         }

//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

//         const updatedUser = await UserModel.update(
//             { password: hashedPassword },
//             { where: { id: user_id } }
//         );

//         if (updatedUser[0] === 0) {
//             return res.status(400).json({ success: false, message: 'user not found or password update failed' });
//         }

//         await client.del(`otp:${id}`);

//         res.json({ success: true, message: 'password updated successfully' });

//     } catch (error) {
//         console.error('Error updating password:', error);
//         res.status(500).json({ success: false, message: 'failed to update password' });
//     }
// };





const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, business_id: user.business_id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );


        res.json({
            success: true,
            message: "login successful",
            token,
            user: { id: user.id, business_id: user.business_id, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error("login error:", error);
        res.status(500).json({ success: false, message: "login failed" });
    }
};



module.exports = {

    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    // updatePassword,
    userLogin

};

