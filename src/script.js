import dotenv from "dotenv"
import connectDB from "./database/database.js"
import { Activity } from "./models/activity.model.js"

dotenv.config()

const addDummyActivities = async () => {
  try {
    await connectDB()
    console.log("DB connected")

    const dummyActivities = [
      {
        title: "Cricket Match",
        description: "Join us for a friendly cricket match at the local stadium.",
        location: "Central Stadium",
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        time: "16:00"
      },
      {
        title: "Movie Night",
        description: "Watch the latest blockbuster with friends.",
        location: "City Cinema",
        date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        time: "19:30"
      },
      {
        title: "Football Tournament",
        description: "Participate in the annual football tournament.",
        location: "Green Field",
        date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        time: "10:00"
      },
      {
        title: "Yoga Workshop",
        description: "A relaxing morning yoga session for all skill levels.",
        location: "Sunrise Park",
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        time: "07:00"
      },
      {
        title: "Coding Bootcamp",
        description: "Full-day hands-on workshop on Node.js and MongoDB.",
        location: "TechHub Co-working Space",
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        time: "09:00"
      },
      {
        title: "Stand-Up Comedy Night",
        description: "An evening of laughs with some of the city's best comedians.",
        location: "Laugh Lounge",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        time: "20:00"
      },
      {
        title: "Photography Walk",
        description: "Explore the city’s old quarters with fellow photo enthusiasts.",
        location: "Old City Gate",
        date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
        time: "06:30"
      },
      {
        title: "Startup Pitch Night",
        description: "Pitch your startup idea or watch others pitch theirs!",
        location: "Innovation Center",
        date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), // 9 days from now
        time: "18:00"
      }
    ]

    await Activity.insertMany(dummyActivities)
    console.log("Dummy activities added")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding activities:", error)
    process.exit(1)
  }
}

addDummyActivities()