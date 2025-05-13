const express = require("express");
const Statemodel = require("../../_Model/State");
const Festivalmodel = require("../../_Model/Famous_things/Festival");
const Productmodel = require("../../_Model/Famous_things/Product");
const Foodmodel = require("../../_Model/Famous_things/Food");
const Placemodel = require("../../_Model/Famous_things/Place");
const WarHistorymodel = require("../../_Model/History/Warhistory")
const originHistory = require("../../_Model/History/Birthhistory")
const danceModel = require("../../_Model/Famous_things/Dance");
const Shortmodel = require("../../_Model/Video_features/Shorts")

const router = express.Router();
const redis = require("../../redisClient")

// Get home slider content based on stateId
router.get("/State_Home_Slider_Content/:stateId", async (req, res) => {
    const { stateId } = req.params; // Extract stateId from URL parameter
    //   console.log(stateId)

    try {
        // Fetch data related to the stateId
        const food = await Foodmodel
            .find({ stateId })
            .select("food_image food_name origi_story -_id")
            .limit(3);

        const state_name = await Statemodel.findOne({ stateId }).select("state_name");

        // Combine the data into a single JSON response
        const result = {
            food, // 3 places
            state_name
        };

        // Send the response with combined data
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

const cacheOrFetch = async (key, fetchFunction) => {
    const cached = await redis.get(key);
    if (cached) {
        console.log(`Cache hit: ${key}`);
        return JSON.parse(cached);
    } else {
        console.log(`Cache miss: ${key}`);
        const data = await fetchFunction();
        await redis.set(key, JSON.stringify(data), 'EX', 120); // 2 minutes
        return data;
    }
};

router.get("/state/:stateId/:section", async (req, res) => {
    const { stateId, section } = req.params;

    try {
        let data;
        const cacheKey = `${section}:${stateId}`;

        switch (section) {
            case "food":
                data = await cacheOrFetch(cacheKey, () => Foodmodel.find({ stateId }));
                break;
            case "war_history":
                data = await cacheOrFetch(cacheKey, () => WarHistorymodel.find({ stateId }));
                break;
            case "origin_history":
                data = await cacheOrFetch(cacheKey, () => originHistory.find({ stateId }));
                break;
            case "place":
                data = await cacheOrFetch(cacheKey, () => Placemodel.find({ stateId }));
                break;
            case "product":
                data = await cacheOrFetch(cacheKey, () => Productmodel.find({ stateId }));
                break;
            case "festival":
                data = await cacheOrFetch(cacheKey, () => Festivalmodel.find({ stateId }));
                break;
            case "dance":
                data = await cacheOrFetch(cacheKey, () => danceModel.find({ stateId }));
                break;
            default:
                return res.status(404).json({ message: "Section not found" });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// const cacheOrFetch = async (key, fetchFunction) => {
//     const cached = await redis.get(key);
//     if (cached) {
//         console.log(`Cache hit: ${key}`);
//         return JSON.parse(cached);
//     } else {
//         console.log(`Cache miss: ${key}`);
//         const data = await fetchFunction();
//         await redis.set(key, JSON.stringify(data), 'EX', 120); // 2 minutes TTL
//         return data;
//     }
// };

router.get("/state_detail/:stateId/:section/:itemId", async (req, res) => {
    const { stateId, section, itemId } = req.params;

    let model;
    switch (section) {
        case "food":
            model = Foodmodel;
            break;
        case "festival":
            model = Festivalmodel;
            break;
        case "war_history":
            model = WarHistorymodel;
            break;
        case "origin_history":
            model = originHistory;
            break;
        case "product":
            model = Productmodel;
            break;
        case "place":
            model = Placemodel;
            break;
        case "dance":
            model = danceModel;
            break;
        default:
            return res.status(404).json({ message: "Section not found" });
    }

    try {
        const cacheKey = `detail:${section}:${itemId}`;
        const detail = await cacheOrFetch(cacheKey, () => model.findById(itemId));

        if (!detail) {
            return res.status(404).json({ message: "Detail not found" });
        }

        res.json(detail);
    } catch (error) {
        console.error("Error fetching detail:", error);
        res.status(500).json({ message: "Server error" });
    }
});



router.get("/Home_Page_Attractions", async (req, res) => {
    try {
        // Fetch the first 4 places (ordered by default _id, or modify if using timestamps/sorting)
        const firstFourPlaces = await Placemodel.find().limit(4);

        // Respond with the first 4 documents
        res.status(200).json(firstFourPlaces);
    } catch (error) {
        console.error("Error fetching places:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/Home_Page_Shorts", async (req, res) => {
    try {
        // Step 1: Get the total count of documents in the collection
        const totalCount = await Shortmodel.countDocuments();

        // Step 2: Generate a random index to select a starting point
        const randomIndex = Math.floor(Math.random() * totalCount);

        // Step 3: Fetch 4 random places starting from the random index
        const randomShorts = await Shortmodel.find()
            .skip(randomIndex) // Skip to the random index
            .limit(4) // Limit to 4 documents

        // Step 4: Respond with the random places
        res.status(200).json(randomShorts);
    } catch (error) {
        console.error("Error fetching random places:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
