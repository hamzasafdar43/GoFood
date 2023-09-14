const express = require("express");
const router = express.Router();
const User = require("../Model/userSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = "alihamzawebdeveloperfullstack";
router.post(
  "/creatuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
  ],
  async(req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      console.log(err);
      return res.status(400).json({ errors: err.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      const { name, email, password, location } = req.body;
      User.findOne({ email: email }, async (error, users) => {
        if (users) {
          res.send({ massage: "user already exist plz go to login page" });
        } else {
          await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            location: req.body.location,
          });
          res.json({ success: true });
        }
      });
    } catch (error) {
      console.log(error);
      console.log(error);
      res.json({ success: false });
    }
  }
);

// .....................Login user ................//
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "password didn't match" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authtoken = jwt.sign(data, jwtSecret);
        res.json({ success, authtoken })


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})




module.exports = router;
