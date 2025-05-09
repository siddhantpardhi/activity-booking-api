import mongoose from "mongoose"

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Activity Title is required"],
        trim: true,
        maxLength: [100, "Activity Title cannot exceed 100 characters"]
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, "Activity Description cannot exceed 500 characters"]
    },
    location: {
        type: String,
        required: [true, "Activity Location is required"],
        trim: true
    },
    date: {
        type: Date,
        required: [true, "Activity Date is required"],
        validate: {
            validator: function (value) {
                return value >= new Date(); // Ensures the date is not in the past
            },
            message: "Activity Date must be in the future"
        }
    },
    time: {
        type: String,
        required: [true, "Activity Time is required"]
    }
}, { timestamps: true })

export const Activity = mongoose.model("Activity", activitySchema)