# 🎯 Basic Activity Booking App - Backend API

A simple REST API built with Node.js, Express.js, and MongoDB for a basic activity booking application — created as part of the MeetX Backend Developer Internship assignment.

---

## 📦 Features

- ✅ User Registration with hashed passwords (bcrypt)
- ✅ User Login with JWT Authentication
- ✅ Publicly list all available activities
- ✅ Book activities (authenticated users only)
- ✅ View all bookings made by the logged-in user
- ✅ Input validation using express-validator
- ✅ Clean code architecture (routes, controllers, models)
- ✅ Tested with Postman collection

---

## 🧰 Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT-based token auth
- **Validation**: express-validator
- **Password Security**: bcrypt
- **Testing**: Postman

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/siddhantpardhi/activity-booking-api.git
cd activity-booking-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create .env file
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run Script.js
Run script.js to create some dummy activities

### 5. Start the server
```bash
npm run start
```

### 6. Register a User
Make POST request to /api/v1/user/register \
Payload
```
{
    "name": "your-name",
    "email": "your-email",
    "password": "your-password",
    "phoneNumber": "your-phone-number"
}
```
Expected Response
```
{
    "status": 200,
    "message": "User Registered Successfully",
    "user": {
        "name": "your-name",
        "email": "your-email",
        "password": "your-hashed-password",
        "_id": "mongodb-id",
        "activitiesBooked": [],
        "createdAt": "2025-05-09T04:18:33.306Z",
        "updatedAt": "2025-05-09T04:18:33.306Z",
        "__v": 0
    }
}
```

### 7. Hit API to get All Activities
Make a GET request to /api/v1/activity/allactivities \

Expected Response
```
{
    "status": 200,
    "message": "Available Activities",
    "data": [
        {
            "title": "Cricket Match",
            "description": "Join us for a friendly cricket match at the local stadium.",
            "location": "Central Stadium",
            "date": "2025-05-11T00:40:46.893Z",
            "time": "16:00",
            "createdAt": "2025-05-09T00:40:46.905Z",
            "updatedAt": "2025-05-09T00:40:46.905Z"
        },
        {
            "title": "Movie Night",
            "description": "Watch the latest blockbuster with friends.",
            "location": "City Cinema",
            "date": "2025-05-13T00:40:46.893Z",
            "time": "19:30",
            "createdAt": "2025-05-09T00:40:46.906Z",
            "updatedAt": "2025-05-09T00:40:46.906Z"
        },
        {
            "title": "Football Tournament",
            "description": "Participate in the annual football tournament.",
            "location": "Green Field",
            "date": "2025-05-15T00:40:46.893Z",
            "time": "10:00",
            "createdAt": "2025-05-09T00:40:46.906Z",
            "updatedAt": "2025-05-09T00:40:46.906Z"
        },
        {
            "title": "Yoga Workshop",
            "description": "A relaxing morning yoga session for all skill levels.",
            "location": "Sunrise Park",
            "date": "2025-05-12T00:40:46.893Z",
            "time": "07:00",
            "createdAt": "2025-05-09T00:40:46.906Z",
            "updatedAt": "2025-05-09T00:40:46.906Z"
        },
        {
            "title": "Coding Bootcamp",
            "description": "Full-day hands-on workshop on Node.js and MongoDB.",
            "location": "TechHub Co-working Space",
            "date": "2025-05-14T00:40:46.893Z",
            "time": "09:00",
            "createdAt": "2025-05-09T00:40:46.907Z",
            "updatedAt": "2025-05-09T00:40:46.907Z"
        },
        {
            "title": "Stand-Up Comedy Night",
            "description": "An evening of laughs with some of the city's best comedians.",
            "location": "Laugh Lounge",
            "date": "2025-05-16T00:40:46.893Z",
            "time": "20:00",
            "createdAt": "2025-05-09T00:40:46.907Z",
            "updatedAt": "2025-05-09T00:40:46.907Z"
        },
        {
            "title": "Photography Walk",
            "description": "Explore the city’s old quarters with fellow photo enthusiasts.",
            "location": "Old City Gate",
            "date": "2025-05-17T00:40:46.893Z",
            "time": "06:30",
            "createdAt": "2025-05-09T00:40:46.907Z",
            "updatedAt": "2025-05-09T00:40:46.907Z"
        },
        {
            "title": "Startup Pitch Night",
            "description": "Pitch your startup idea or watch others pitch theirs!",
            "location": "Innovation Center",
            "date": "2025-05-18T00:40:46.893Z",
            "time": "18:00",
            "createdAt": "2025-05-09T00:40:46.907Z",
            "updatedAt": "2025-05-09T00:40:46.907Z"
        }
    ]
}
```
### 8. Login User
Login your user on /api/v1/user/login \
Payload
```
{
    "email": "your-email",
    "password": "your-password"
}
```

Expected Response
```
{
    "status": 200,
    "token": "jwt-auth-token"
}
```

### 9. Hit Protected Routes
- Make a POST request to /api/v1/activity/book \
  Payload
```
{
    "activityId": "mongodb-_id-from-activity-table"
}
```

- Make a GET request to /api/v1/activity/mybookings \
You should be able to view all the bookings made by the logged in user
