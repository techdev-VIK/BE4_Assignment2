const mongoose = require('mongoose');

//create schema

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Intermediate', 'Difficult']
    },
    prepTime: {
        type: Number,
        require: true
    },
    cookTIme: {
        type: Number,
        require: true,
    },
    ingredients: [
        {
            type: String,
            require: true,
        }
    ],
    instructions: [
        {
            type: String,
            require: true
        }
    ],
    imageUrl: {
        type: String,
        require: true,
    }
}, {
    timestamps: true
})


//create model

const Recipe = mongoose.model('Recipe', recipeSchema);


//export model

module.exports = Recipe;