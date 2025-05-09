import mongoose from "mongoose"
import { Activity } from "../models/activity.model.js"
import { User } from "../models/user.model.js"
import { validationResult } from "express-validator"

export const listAllActivities = async(req, res) => {
    
    try {

        const page = Math.max(parseInt(req.query.page) || 0, 1)
        const parsedLimit = parseInt(req.query.limit)
        const limit = Math.min(Math.max(!isNaN(parsedLimit) ? parsedLimit : 10, 1), 50)
        const skip = (page - 1) * limit

        const allActivities = await Activity
        .find({})
        .skip(skip)
        .limit(limit)
        .select("-_id -__v")
        
        const activeActivities = allActivities.filter( (activity) => activity.date >= new Date())
    
        res.status(200).json( { status: 200, message: "Available Activities", data: activeActivities } )
    } catch (error) {
        console.error("Error while Listing Activities ", error)
        res.status(500).json( { status: 500, message: error.message } )
    }
}

export const bookAnActivity = async(req, res) => {

    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({ status:400, errors: errors.array() })

        const { activityId } = req.body
    
        const activity = await Activity.findById(activityId)
    
        if(!activity) res.status(400).json( { status: 400, message: "No such activity exists" } )
    
        const updatedUser = await User.findOneAndUpdate( 
            { _id: req.userID, "activitiesBooked.activity": { $ne: activityId } },
            {
                $push: {
                    activitiesBooked: {
                        activity: activity._id,
                        bookedAt: new Date()
                    }
                }
            },
            { new: true }
        )

        if(!updatedUser) return res.status(400).json( { status: 400, message: "You have Already Booked this Activity" })

        res.status(200).json( { status: 200, message: `${activity.title} Booked Successfully`})
    } catch (error) {
        console.error("Error while Booking an Activity ", error)
        res.status(500).json({ status: 500, message: error.message })
    }
}

export const getBookedActivites = async(req, res) => {

    try {

        const bookedActivities = await User.findById(req.userID)
        .select("activitiesBooked")
        .populate({
            path: "activitiesBooked.activity",
            select: "title description location date time"
        })

        console.log("🚀 ~ getBookedActivites ~ bookedActivities:", bookedActivities)
        
        if(!bookedActivities.activitiesBooked.length) {
            return res.status(400).json({ status: 400, message: "No bookings made" })
        }
    
        res.status(200).json({ status: 200, message: "success", data: bookedActivities })
    } catch (error) {
        console.error("Error while getting my bookings ", error)
        res.status(500).json({ status: 500, message: error.message })
    }
}