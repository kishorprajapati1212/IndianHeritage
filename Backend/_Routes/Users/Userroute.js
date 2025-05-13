const express = require("express");
const usermodel = require("../../_Model/Users/User")
const forgotpassmodel = require("../../_Model/Users/Forgotpass")
const nodemailer = require('nodemailer');

const router = express.Router();

router.post("/sendmail", async (req, res) => {
    const { email } = req.body;
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

    try {
        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // App password or Gmail password
            },
        });

        // Define email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Forgot Password OTP",
            html: `
                <p>Dear User,</p>
                <p>Here is your OTP to reset your password:</p>
                <p style="font-weight: bold; font-size: 18px;">${randomCode}</p>
                <p>Please use this code within 5 minutes.</p>
                <p>If you did not request this, ignore this email.</p>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Save OTP to database
        const forgotPassEntry = new forgotpassmodel({
            email,
            randomcode: randomCode,
        });
        await forgotPassEntry.save();

        res.status(200).json({ mtype: "success", message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending mail or saving OTP:", error);
        res.status(500).json({ mtype: "fail", message: "Failed to send OTP" });
    }
});

// Verify OTP
router.post("/verifyotp", async (req, res) => {
    const { email, randomCode } = req.body;

    try {
        // Check for matching OTP and ensure it's not expired (5 minutes)
        const record = await forgotpassmodel.findOne({ email, randomcode: randomCode });

        if (!record) {
            return res.status(400).json({ mtype: "fail", message: "Invalid OTP or email" });
        }

        const timeDiff = Date.now() - new Date(record.time).getTime();
        if (timeDiff > 5 * 60 * 1000) {
            return res.status(400).json({ mtype: "fail", message: "OTP expired" });
        }

        res.status(200).json({ mtype: "success", message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ mtype: "fail", message: "Internal server error" });
    }
});

router.post("/regular_user_sigin", async (req, res) => {
    try {
        const { username, email, password, role = "RegularUser" } = req.body;

        const existingUser = await usermodel.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: "User already exists" })
        }

        const newuser = await usermodel.create({ username, email, password, role })

        if (newuser) {
            res.status(200).json({ message: "User Login Successfully" })
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post("/artist_signin", async (req, res) => {
    const { username, email, password, role = "Artist", artistData, adhar_card } = req.body;

    const existingUser = await usermodel.findOne({ email: email })
    if (existingUser) {
        res.status(400).json({ message: "User already exists" })
    }

    try {
        // Create a new artist document
        const newArtist = new usermodel({
            username,
            email,
            password, // Note: You should hash the password before saving (e.g., using bcrypt)
            role,
            artistData,
            adhar_card
        });

        // Save the artist to the database
        const savedArtist = await newArtist.save();

        res.status(200).json({ message: 'Artist registered successfully!', savedArtist });
    } catch (error) {
        console.error('Error saving artist:', error);
        res.status(500).json({ message: 'Failed to register artist', error });
    }
})

router.post("/login_user", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        // Find the user by email
        const Get_user = await usermodel.findOne({ email });

        // If user is not found, return error
        if (!Get_user) {
            return res.status(400).json({ message: "User Not Found" });
        }

        // Strictly compare the password
        if (Get_user.password !== password) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        // If both email and password match exactly
        res.status(200).json({ message: "User Login Successfully", user: Get_user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/one_user_detail_by_id", async (req, res) => {
    try {
        const { userId } = req.body;  // Access userId from the request body
        console.log(userId);

        const userdetail = await usermodel.findOne({ userId });

        if (!userdetail) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log(userdetail);  // Log user details to check
        res.status(200).json({ userdetail });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/update_artist/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedData = req.body;
        const result = await usermodel.findOneAndUpdate({ userId }, updatedData, { new: true });
        if (!result) {
            return res.status(404).json({ error: "Artist not found" });
        }
        res.status(200).json({ message: "Artist updated successfully", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/Get_artist", async (req, res) => {
    try {
        const artist = await usermodel.find({ role: "Artist" });
        res.status(200).json({ artist })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


router.get("/All_user", async (req, res) => {
    console.log("hello")
    const users = await usermodel.find();
    console.log(users)
    res.json(users)

})
module.exports = router; 