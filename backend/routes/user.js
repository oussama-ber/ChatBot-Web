const express = require("express");

const multer = require("multer");

var randomstring = require("randomstring");

const checkAuth = require("../middleware/check-auth");
const chechAdmin = require("../middleware/check-admin");

// no need for user , bcrypt , jwt. we need them in userController 
// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const userController = require("../controllers/user"); 


const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

const router = express.Router();
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/profilePics");
  },
  filename: (req, file, cb) => {
    console.log("here in the storage fc." + file.name);
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post("/signup", multer({ storage: storage }).single("image"), userController.createUser);

router.post("/login",userController.loginUser);

// new get the secretToken active the user 
router.get("/verify/:secretToken",userController.activeUser );
//reset password router
router.put("/resetpassword/:passwordToken",  userController.updatePassword);

// send email on reset
router.put("/reset", userController.sendEmailUpdatePassword);

router.get("/getusers", userController.getUsers );

module.exports = router;
