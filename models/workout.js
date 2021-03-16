// define schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutList = new Schema ({

    day: {
        type: Date,
        trim: true,
        required: true,
        default: Date.now
    },

    excerciseType: [{

    name: {
        type: String,
        trim: true,
        required: "Name is required",
        validate: [({ length }) => length <= 30, "Name is too long, please choose different name"]
    },
    type: {
        type: String,
        trim: true,
        required: "Must know the type of exercise being performed",
        validate: [({ length }) => length <= 30, "Type of exercise is too long"]
    },
    weight: {
        type: Number,
        trim: true
    },
    reps: {
        type: Number,
        trim: true
    },
    duration: {
        type: Number,
        trim: true,
        required: "Must know duration",
        default: 0
    }

}]

});

const Workout = mongoose.model('Workout', WorkoutList);

module.exports = Workout;