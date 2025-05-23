const express = require("express");
const warhistorymodel = require("../../_Model/History/Warhistory");

const router = express.Router();
const redisClient = require("../../redisClient");

// const translate = require('@vitalets/google-translate-api');

router.post("/addWarHistory", async (req, res) => {
    try {
        const keys = await redisClient.keys('warHistory:page=*');
        if (keys.length > 0) {
            await redisClient.del(keys);
        }
        const warhistorydata = req.body;
        // console.log(warhistorydata);

        const historysave = new warhistorymodel(warhistorydata);
        await historysave.save();
        // console.log("savehistory" + historysave)
        res.json(historysave);
    } catch (error) {
        res.json("Internal error", error)
    }
})

router.get("/getWarHistory", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const catchKey = `warHistory:page=${page}:limit=${limit}`

    try {
        const catchData = await redisClient.get(catchKey)
        if (catchData) {
            console.log("Serving from Redis cache");
            return res.json(JSON.parse(catchData));
        }
        const warhistorydata = await warhistorymodel
            .find()
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        const total = await warhistorymodel.countDocuments();
        const hasMore = (page * limit) < total
        const responseData = { data: warhistorydata, hasMore };
        await redisClient.setEx(catchKey, 60, JSON.stringify(responseData));
        res.status(200).json(responseData);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});


router.get("/deleteWarHistory/:id", async (req, res) => {
    try {
        const keys = await redisClient.keys('warHistory:page=*');
        if (keys.length > 0) {
            await redisClient.del(keys);
        }
        const historyId = req.params.id;
        console.log(historyId);

        // Attempt to find and delete the history by its ID
        const deletedHistory = await warhistorymodel.findOneAndDelete({ historyId: historyId });

        if (!deletedHistory) {
            return res.status(404).json({ message: "War history not found" });
        }

        // Return the deleted document
        res.json({ message: "War history deleted successfully", data: deletedHistory });

    } catch (error) {
        // Handle the error properly
        console.error("Error during deletion:", error);
        res.status(500).json({ message: "Internal error occurred", error: error.message });
    }
});

router.get("/get_One_War_History/:historyId", async (req, res) => {
    try {
        const historyId = req.params.historyId;
        console.log(historyId)
        const warhistorydata = await warhistorymodel.findOne({ historyId: historyId });
        res.json(warhistorydata);
    } catch (error) {
        res.status(500).json({ message: "Internal error occurred", error: error.message });
    }
})

router.post("/update_war_history/:historyId", async (req, res) => {
    try {
        const keys = await redisClient.keys('warHistory:page=*');
        if (keys.length > 0) {
            await redisClient.del(keys);
        }
        const historyId = req.params.historyId;
        const warHistory = req.body;
        // console.log(historyId);
        // console.log(warHistory);

        const updatedHistory = await warhistorymodel.findOneAndUpdate(
            { historyId: historyId },
            warHistory,
            { new: true }
        );

        if (updatedHistory) {
            res.status(200).json({ message: "Updated Successfully" });
        }


    } catch (error) {
        res.status(500).json({ message: "Internal error occurred", error: error.message });
    }
})


// router.post('/translate', async (req, res) => {
//     const { text, targetLang } = req.body;

//     console.log("Received text:", text);
//     console.log("Target language:", targetLang);

//     if (!text || !targetLang) {
//       return res.status(400).json({ error: 'Text and targetLang are required' });
//     }

//     try {
//       const translation = await translate(text, { to: targetLang });
//       console.log("Translation successful:", translation.text);
//       res.json({ translatedText: translation.text });
//     } catch (error) {
//       console.error("Translation error details:", error);
//       res.status(500).json({
//         error: 'Translation failed',
//         details: error.message || error,
//       });
//     }
//   });


module.exports = router; 