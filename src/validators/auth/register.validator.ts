const { body } = require("express-validator");

export const registerValidator = () => {
	return [
		body("username")
			.notEmpty()
			.withMessage("Name is required.")
			.isLength({ min: 2, max: 30 })
			.withMessage("Username must be between 2 and 30 characters"),
		body("email")
			.notEmpty()
			.withMessage("Email is required.")
			.isEmail()
			.withMessage("Email is invalid."),
		body("password")
			.notEmpty()
			.withMessage("Password is required.")
			.isLength({ min: 8 })
			.withMessage("Password must be more than 8 characters"),
		body("confirmPassword")
			.notEmpty()
			.withMessage("Confirm Password is required."),
	];
};
