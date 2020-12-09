const { body } = require("express-validator");


module.exports = {

    validation_create_user: [

        body("name").isLength({ min: 2, max: 30 }).withMessage("Number caracteres is min: 2 and max: 30"),
        body("surname").isLength({ min: 2, max: 50 }).withMessage("Number caracteres is min: 2 and max: 50"),
        body("email").isEmail().withMessage("Insert email valid"),
        body("password").isLength({ min: 8, max: 30 }).withMessage("Password min caracteres: 8 and max: 30")
    ],

    validation_update_user: [

        body("name").optional().isLength({ min: 2, max: 30 }).withMessage("Number caracteres is min: 2 and max: 30"),
        body("surname").optional().isLength({ min: 2, max: 50 }).withMessage("Number caracteres is min: 2 and max: 50"),
        body("email").optional().isEmail().withMessage("Insert email valid"),
        body("password").optional().isLength({ min: 8, max: 30 }).withMessage("Password min caracteres: 8 and max: 30")
    ]
}