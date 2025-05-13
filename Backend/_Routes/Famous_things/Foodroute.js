const express = require("express");
const Foodmodel = require("../../_Model/Famous_things/Food");

const router = express.Router();
const redis = require("../../redisClient")

// there is two catch Key for this one 
// 1) food:all
// 2) food:${req.params.foodId}
// 3) food:${stateId}

router.post("/Add_food", async (req, res) => {
    try {
        await redisClient.del("food:all");

        // console.log("getting" + req.body);
        const newfood = await Foodmodel.create(req.body);

        // console.log("saving"+newfood)
        res.status(200).json(newfood);

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.post("/Update_food/:foodId", async (req, res) => {
    try {
        // console.log(req.params.foodId)
        const food = await Foodmodel.findOneAndUpdate({ foodId: req.params.foodId },
            { $set: req.body },
            { new: true }
        );

        if (food) {
            const catchKey = `food:${req.params.foodId}`;

            await Promise.all([
                redis.set(catchKey, JSON.stringify(food)),
                redis.del("food:all")
            ])
            res.status(200).json(food)
        }

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.get("/Get_all_food", async (req, res) => {
    try {
        const catchfood = await redis.get("food:all")

        if (catchfood) {
            return res.status(200).json(JSON.parse(catchfood))
        }

        const foods = await Foodmodel.find();
        await redis.set("food:all", JSON.stringify(foods))
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.get("/Delete_food/:foodId", async (req, res) => {
    try {
        // console.log(req.params.foodId)
        const food = await Foodmodel.findOneAndDelete({ foodId: req.params.foodId });

        if(food){
            const catchKey = `food:${req.params.foodId}`;

            await Promise.all([
                redis.del(catchKey),
                redis.del("food:all")
            ])
        }
        res.status(200).json(food)


    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.get("/Get_food_by_id/:foodId", async (req, res) => {
    try {
        const catchKey = `food:${req.params.foodId}`;
        const catchfood = await redis.get(catchKey)

        if (catchKey) {
            return res.status(200).json(JSON.parse(catchfood))
        }
        const food = await Foodmodel.findOne({ foodId: req.params.foodId });

        if (food) {
            await redis.set(catchKey, JSON.stringify(food))
        }
        res.status(200).json(food)

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

module.exports = router; 