import { body, query } from "express-validator"

export const validateRegister = [
    body('name')
        .custom(value => typeof value === "string")
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage('Name is required'),
    body('phoneNumber')
        .custom(value => typeof value === "string")
        .withMessage("Phone Number must be a string")
        .notEmpty()
        .withMessage('Phone Number is required')
]

export const commonUserValidations = [
    body('email')
        .custom(value => typeof value === "string")
        .withMessage("Email must be a string")
        .notEmpty()
        .withMessage('Email is required'),
    body('password')
        .custom(value => typeof value === "string")
        .withMessage("Password must be a string")
        .notEmpty()
        .withMessage('Password is required')
]

export const validateBooking = [
    body('activityId')
        .custom(value => typeof value === "string")
        .withMessage("Activity ID must be a string")
        .notEmpty()
        .withMessage("Activity ID is required")
]