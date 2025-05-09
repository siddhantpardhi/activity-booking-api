import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be atleast 8 characters"],
        select: false
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone Number is required"],
        match: /^[0-9]{10}$/ 
    },
    activitiesBooked: [{
        activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activity"
        },
        bookedAt: {
            type: Date
        }
    }]
}, { timestamps: true } )

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next()
    }

    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

export const User = mongoose.model("User", userSchema)