const { body } = require("express-validator");

module.exports.profileValidator = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .trim()
    .bail()
    .isString()
    .withMessage("name must be a string")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Please enter name within 3-30 chars"),

  body("email")
    .notEmpty()
    .withMessage("email is required")
    .trim()
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("addresses").optional(),

  /** wilcard validation */
  body("addresses.*.postalCode")
    .notEmpty()
    .withMessage({
      message: "Postal code is required",
    })
    .bail()
    .isString()
    .withMessage("Postal code must be a number")
    .toInt(),

  /** custom validation */
  body("skills")
    .optional()
    .customSanitizer((value) => {
      if (value.length > 0) {
        return value.split(",").map((item) => item.trim());
      }
      return true;
    }),
];
