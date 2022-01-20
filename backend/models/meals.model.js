const mongoose = require('mongoose')

const mealSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    meal: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    calories: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
})

const Meal = mongoose.model('Meal', mealSchema)

module.exports = Meal