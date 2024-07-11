const Smartphone = require('../models/SmartphoneModel')
const mongoose = require('mongoose')

// GET ALL SMARTPHONE
const getAllSmartphone = async (req, res) => {
    const smartphone = await Smartphone.find({}).sort({brand_name: 1})
    return res.status(200).json(smartphone)
}


// GET A SINGLE SMARTPHONE
const getSmartphoneById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Invalid Smartphone ID (getSmartphoneById)"})
    }

    const smartphone = await Smartphone.findById(id)

    if (!smartphone){
        return res.status(404).json({error: "No such smartphone (getSmartphoneById)"})
    }

    return res.status(200).json(smartphone)
}


// INSERT A SINGLE SMARTPHONE
const insertSmartphone = async (req, res) => {
    const { brand_name, model, price, rating, has_5g, has_nfc, has_ir_blaster,
        processor_brand, num_cores, processor_speed, battery_capacity,
        fast_charging_available, ram_capacity, internal_memory,
        screen_size, refresh_rate, resolution, num_rear_cameras,
        num_front_cameras, os, primary_camera_rear, primary_camera_front,
        extended_memory_available } = req.body;

    const emptyFields = [];

    if (!brand_name) {
        emptyFields.push('Brand Name');
    }
    if (!model) {
        emptyFields.push('Model');
    }
    if (!price) {
        emptyFields.push('Price');
    }
    if (rating === undefined) {
        emptyFields.push('Rating');
    }
    if (has_5g === undefined) {
        emptyFields.push('5G Support');
    }
    if (has_nfc === undefined) {
        emptyFields.push('NFC Support');
    }
    if (has_ir_blaster === undefined) {
        emptyFields.push('IR Blaster');
    }
    if (!processor_brand) {
        emptyFields.push('Processor Brand');
    }
    if (!num_cores) {
        emptyFields.push('Number of Cores');
    }
    if (!processor_speed) {
        emptyFields.push('Processor Speed');
    }
    if (!battery_capacity) {
        emptyFields.push('Battery Capacity');
    }
    if (fast_charging_available === undefined) {
        emptyFields.push('Fast Charging');
    }
    if (!ram_capacity) {
        emptyFields.push('RAM Capacity');
    }
    if (!internal_memory) {
        emptyFields.push('Internal Memory');
    }
    if (!screen_size) {
        emptyFields.push('Screen Size');
    }
    if (!refresh_rate) {
        emptyFields.push('Refresh Rate');
    }
    if (!resolution) {
        emptyFields.push('Resolution');
    }
    if (!num_rear_cameras) {
        emptyFields.push('Number of Rear Cameras');
    }
    if (!num_front_cameras) {
        emptyFields.push('Number of Front Cameras');
    }
    if (!os) {
        emptyFields.push('Operating System');
    }
    if (!primary_camera_rear) {
        emptyFields.push('Primary Rear Camera');
    }
    if (!primary_camera_front) {
        emptyFields.push('Primary Front Camera');
    }
    if (extended_memory_available === undefined) {
        emptyFields.push('Extended Memory');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill all required fields', emptyFields });
    }

    const smartphoneWithoutNull = {}

    if (brand_name !== undefined && brand_name !== null && brand_name !== "")
        smartphoneWithoutNull.brand_name = brand_name;
    if (model !== undefined && model !== null && model !== "")
        smartphoneWithoutNull.model = model;
    if (price !== undefined && price !== null && price !== "")
        smartphoneWithoutNull.price = price;
    if (rating !== undefined && rating !== null && rating !== "")
        smartphoneWithoutNull.rating = rating;
    if (has_5g !== undefined && has_5g !== null)
        smartphoneWithoutNull.has_5g = has_5g;
    if (has_nfc !== undefined && has_nfc !== null)
        smartphoneWithoutNull.has_nfc = has_nfc;
    if (has_ir_blaster !== undefined && has_ir_blaster !== null)
        smartphoneWithoutNull.has_ir_blaster = has_ir_blaster;
    if (processor_brand !== undefined && processor_brand !== null && processor_brand !== "")
        smartphoneWithoutNull.processor_brand = processor_brand;
    if (num_cores !== undefined && num_cores !== null && num_cores !== "")
        smartphoneWithoutNull.num_cores = num_cores;
    if (processor_speed !== undefined && processor_speed !== null && processor_speed !== "")
        smartphoneWithoutNull.processor_speed = processor_speed;
    if (battery_capacity !== undefined && battery_capacity !== null && battery_capacity !== "")
        smartphoneWithoutNull.battery_capacity = battery_capacity;
    if (fast_charging_available !== undefined && fast_charging_available !== null)
        smartphoneWithoutNull.fast_charging_available = fast_charging_available;
    if (ram_capacity !== undefined && ram_capacity !== null && ram_capacity !== "")
        smartphoneWithoutNull.ram_capacity = ram_capacity;
    if (internal_memory !== undefined && internal_memory !== null && internal_memory !== "")
        smartphoneWithoutNull.internal_memory = internal_memory;
    if (screen_size !== undefined && screen_size !== null && screen_size !== "")
        smartphoneWithoutNull.screen_size = screen_size;
    if (refresh_rate !== undefined && refresh_rate !== null && refresh_rate !== "")
        smartphoneWithoutNull.refresh_rate = refresh_rate;
    if (resolution !== undefined && resolution !== null && resolution !== "")
        smartphoneWithoutNull.resolution = resolution;
    if (num_rear_cameras !== undefined && num_rear_cameras !== null && num_rear_cameras !== "")
        smartphoneWithoutNull.num_rear_cameras = num_rear_cameras;
    if (num_front_cameras !== undefined && num_front_cameras !== null && num_front_cameras !== "")
        smartphoneWithoutNull.num_front_cameras = num_front_cameras;
    if (os !== undefined && os !== null && os !== "")
        smartphoneWithoutNull.os = os;
    if (primary_camera_rear !== undefined && primary_camera_rear !== null && primary_camera_rear !== "")
        smartphoneWithoutNull.primary_camera_rear = primary_camera_rear;
    if (primary_camera_front !== undefined && primary_camera_front !== null && primary_camera_front !== "")
        smartphoneWithoutNull.primary_camera_front = primary_camera_front;
    if (extended_memory_available !== undefined && extended_memory_available !== null)
        smartphoneWithoutNull.extended_memory_available = extended_memory_available;

    try {
        const smartphone = await Smartphone.create(smartphoneWithoutNull);
        return res.status(200).json(smartphone);
    } catch (error) {
        return res.status(400).json({ error: 'Failed to insert smartphone', details: error.message });
    }
};


// DELETE A SINGLE SMARTPHONE
const deleteSmartphoneById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Invalid Smartphone ID (deleteSmartphoneById)"})
    }

    const smartphone = await Smartphone.findOneAndDelete({_id: id})

    if (!smartphone){
        return res.status(404).json({error: "No such smartphone (deleteSmartphoneById)"})
    }

    return res.status(200).json(smartphone)
}


// UPDATE A SINGLE SMARTPHONE
const updateSmartphoneById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Smartphone ID (updateSmartphoneById)" });
    }

    const {
        brand_name, model, price, rating, has_5g, has_nfc, has_ir_blaster,
        processor_brand, num_cores, processor_speed, battery_capacity,
        fast_charging_available, ram_capacity, internal_memory,
        screen_size, refresh_rate, resolution, num_rear_cameras,
        num_front_cameras, os, primary_camera_rear, primary_camera_front,
        extended_memory_available
    } = req.body;

    const setFields = {};
    const unsetFields = {};

    if (brand_name !== undefined && brand_name !== null && brand_name !== "")
        setFields.brand_name = brand_name;
    else unsetFields.brand_name = "";

    if (model !== undefined && model !== null && model !== "")
        setFields.model = model;
    else unsetFields.model = "";

    if (price !== undefined && price !== null && price !== "")
        setFields.price = price;
    else unsetFields.price = "";

    if (rating !== undefined && rating !== null && rating !== "")
        setFields.rating = rating;
    else unsetFields.rating = "";

    if (has_5g !== undefined && has_5g !== null)
        setFields.has_5g = has_5g;
    else unsetFields.has_5g = "";

    if (has_nfc !== undefined && has_nfc !== null)
        setFields.has_nfc = has_nfc;
    else unsetFields.has_nfc = "";

    if (has_ir_blaster !== undefined && has_ir_blaster !== null)
        setFields.has_ir_blaster = has_ir_blaster;
    else unsetFields.has_ir_blaster = "";

    if (processor_brand !== undefined && processor_brand !== null && processor_brand !== "")
        setFields.processor_brand = processor_brand;
    else unsetFields.processor_brand = "";

    if (num_cores !== undefined && num_cores !== null && num_cores !== "")
        setFields.num_cores = num_cores;
    else unsetFields.num_cores = "";

    if (processor_speed !== undefined && processor_speed !== null && processor_speed !== "")
        setFields.processor_speed = processor_speed;
    else unsetFields.processor_speed = "";

    if (battery_capacity !== undefined && battery_capacity !== null && battery_capacity !== "")
        setFields.battery_capacity = battery_capacity;
    else unsetFields.battery_capacity = "";

    if (fast_charging_available !== undefined && fast_charging_available !== null)
        setFields.fast_charging_available = fast_charging_available;
    else unsetFields.fast_charging_available = "";

    if (ram_capacity !== undefined && ram_capacity !== null && ram_capacity !== "")
        setFields.ram_capacity = ram_capacity;
    else unsetFields.ram_capacity = "";

    if (internal_memory !== undefined && internal_memory !== null && internal_memory !== "")
        setFields.internal_memory = internal_memory;
    else unsetFields.internal_memory = "";

    if (screen_size !== undefined && screen_size !== null && screen_size !== "")
        setFields.screen_size = screen_size;
    else unsetFields.screen_size = "";

    if (refresh_rate !== undefined && refresh_rate !== null && refresh_rate !== "")
        setFields.refresh_rate = refresh_rate;
    else unsetFields.refresh_rate = "";

    if (resolution !== undefined && resolution !== null && resolution !== "")
        setFields.resolution = resolution;
    else unsetFields.resolution = "";

    if (num_rear_cameras !== undefined && num_rear_cameras !== null && num_rear_cameras !== "")
        setFields.num_rear_cameras = num_rear_cameras;
    else unsetFields.num_rear_cameras = "";

    if (num_front_cameras !== undefined && num_front_cameras !== null && num_front_cameras !== "")
        setFields.num_front_cameras = num_front_cameras;
    else unsetFields.num_front_cameras = "";

    if (os !== undefined && os !== null && os !== "")
        setFields.os = os;
    else unsetFields.os = "";

    if (primary_camera_rear !== undefined && primary_camera_rear !== null && primary_camera_rear !== "")
        setFields.primary_camera_rear = primary_camera_rear;
    else unsetFields.primary_camera_rear = "";

    if (primary_camera_front !== undefined && primary_camera_front !== null && primary_camera_front !== "")
        setFields.primary_camera_front = primary_camera_front;
    else unsetFields.primary_camera_front = "";

    if (extended_memory_available !== undefined && extended_memory_available !== null)
        setFields.extended_memory_available = extended_memory_available;
    else unsetFields.extended_memory_available = "";

    const update = {};
    if (Object.keys(setFields).length > 0) update.$set = setFields;
    if (Object.keys(unsetFields).length > 0) update.$unset = unsetFields;

    try {
        const smartphone = await Smartphone.findOneAndUpdate({ _id: id }, update, { new: true });

        if (!smartphone) {
            return res.status(404).json({ error: "No such smartphone (updateSmartphoneById)" });
        }

        return res.status(200).json(smartphone);
    } catch (error) {
        return res.status(400).json({ error: "Failed to update smartphone", details: error.message });
    }
};


// QUERY
const filterSearchAndSortSmartphones = async (req, res) => {
    const { price_min, price_max, rating_min, rating_max, brand_name, model, sortBy } = req.body;

    const query = {};

    // Price filtering
    if (price_min !== undefined && price_min !== null && !isNaN(price_min)) {
        query.price = { $gte: Number(price_min) };
    }
    if (price_max !== undefined && price_max !== null && !isNaN(price_max)) {
        if (query.price) {
            query.price.$lte = Number(price_max);
        } else {
            query.price = { $lte: Number(price_max) };
        }
    }

    // Rating filtering
    if (rating_min !== undefined && rating_min !== null && !isNaN(rating_min)) {
        query.rating = { $gte: Number(rating_min) };
    }
    if (rating_max !== undefined && rating_max !== null && !isNaN(rating_max)) {
        if (query.rating) {
            query.rating.$lte = Number(rating_max);
        } else {
            query.rating = { $lte: Number(rating_max) };
        }
    }

    // Brand name research
    if (brand_name) {
        query.brand_name = { $regex: new RegExp(brand_name, "i") };
    }

    // Model research
    if (model) {
        query.model = { $regex: new RegExp(model, "i") };
    }

    // Sorting
    const validSortOptions = ["price_asc", "price_desc", "rating_asc", "rating_desc"];
    let sortCriteria = {};

    if (sortBy && validSortOptions.includes(sortBy)) {
        switch (sortBy) {
            case "price_asc":
                sortCriteria = { price: 1 };
                break;
            case "price_desc":
                sortCriteria = { price: -1 };
                break;
            case "rating_asc":
                sortCriteria = { rating: 1 };
                break;
            case "rating_desc":
                sortCriteria = { rating: -1 };
                break;
            default:
                break;
        }
    }

    try {
        const smartphones = await Smartphone.find(query).sort(sortCriteria);
/*
        if (smartphones.length === 0) {
            return res.status(404).json({ error: "No smartphones found with the specified criteria." });
        }
*/
        return res.status(200).json(smartphones);
    } catch (error) {
        return res.status(400).json({ error: "Failed to filter, search or sort smartphones", details: error.message });
    }
};

// ADD NEW REVIEW
const addReviewToSmartphone = async (req, res) => {
    const { smartphoneId, rating, comment } = req.body;

    if (!rating || !comment) {
        return res.status(400).json({ error: "Rating and comment are required." });
    }

    try {
        const smartphone = await Smartphone.findById(smartphoneId);
        if (!smartphone) {
            return res.status(404).json({ error: "Smartphone not found." });
        }

        const newReview = {
            user_username: req.user.username, 
            rating: Number(rating),
            comment: comment,
            review_date: new Date()
        };

        smartphone.reviews.push(newReview);
        await smartphone.save();

        return res.status(201).json(smartphone);
    } catch (error) {
        return res.status(500).json({ error: "Failed to add review.", details: error.message });
    }
};


module.exports = {
    getAllSmartphone,
    getSmartphoneById,
    insertSmartphone,
    deleteSmartphoneById,
    updateSmartphoneById,
    filterSearchAndSortSmartphones,
    addReviewToSmartphone
}