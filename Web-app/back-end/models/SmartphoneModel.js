const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user_username: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 10 
    },
    comment: { 
        type: String, 
        required: true 
    },
    review_date: { 
        type: Date, 
        default: Date.now 
    }
});

const smartphoneSchema = new mongoose.Schema({
  
    brand_name: {
         type: String, 
         required: true 
        },
    model: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    rating: { 
        type: Number, 
        min: 1, 
        max: 10
    },
    has_5g: { 
        type: Boolean
    },
    has_nfc: { 
        type: Boolean
    },
    has_ir_blaster: { 
        type: Boolean        
     },
    processor_brand: { 
        type: String, 
        required: true 
    },
    num_cores: { 
        type: Number, 
        required: true 
    },
    processor_speed: { 
        type: Number, 
        required: true 
    }, 
    battery_capacity: { 
        type: Number, 
        required: true 
    }, 
    fast_charging_available: { 
        type: Number, 
        required: true 
    },
    ram_capacity: { 
        type: Number, 
        required: true }, 
    internal_memory: { 
        type: Number, 
        required: true 
    }, 
    screen_size: { 
        type: Number, 
        required: true 
    }, 
    refresh_rate: { 
        type: Number, 
        required: true 
    },
    resolution: { 
        type: String, 
        required: true 
    },
    num_rear_cameras: { 
        type: Number,
        required: true 
    },
    num_front_cameras: { 
        type: Number, 
        required: true 
    },
    os: { 
        type: String, 
        required: true 
    },
    primary_camera_rear: { 
        type: Number, 
        required: true 
    },
    primary_camera_front: { 
        type: Number, 
        required: true 
    }, 
    extended_memory_available: { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
    reviews: [reviewSchema]
});

// Middleware to update the updatedAt field on save
smartphoneSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


module.exports = mongoose.model('Smartphone', smartphoneSchema);
