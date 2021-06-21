const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const randomstring = require("randomstring");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      console.log(" test if in the authServices the image sended correctly: " + req.file.name);
      console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      // Generate secret password. 32 random string.
      const secretToken = randomstring.generate();
      console.log(secretToken);
      const passwordToken = randomstring.generate();
      console.log(passwordToken);
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/profilePics/" + req.file.filename;
      // Flag the account as inactive.
      active = false;
      console.log("here");
  const img = req.file.filename ;
  console.log("img: " + img);
  // file is undefined !!!!!!!! imagePath fil body !
  // console.log("file name " +req.file);
  // console.log("img" +imagePath );
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        active: false,
        secretToken: randomstring.generate(),
        passwordToken: randomstring.generate(),
        role: req.body.role,
        imagePath: url + "/profilePics/" + img,
        // temporarytoken: jwt.sign(
        //   { email: fetchedUser.email, userId: fetchedUser._id },
        //   "secret_this_should_be_longer",
        //   { expiresIn: "1h" }
        //)
      });
      const msg = {
        to: user.email,
        from: "youssef.benhajsalah@medtech.tn",
        subject: "account validation",
        text:
          "please copy the code below Code " +
          user.secretToken +
          " and paste it here http://localhost:4200/verify",
        html:
          "Hi " +
          user.name +
          '<br> <strong> Please click on this link to validate your account. </strong> <a href="http://localhost:4200/verify/' +
          user.secretToken +
          '">http://localhost:4200/verify/' +
          user.secretToken +
          "</a> <br><br>Thank you. ",
      };
      user
        .save()
        .then((result) => {
          sgMail
            .send(msg)
            .then(() => {
              console.log("account verification link sent!");
            })
            .catch((error) => {
              console.log(error.response.body);
              // console.log(error.response.body.errors[0].message)
            });
          console.log(result + user);
          res.status(201).json({
            message:
              "User Registred, please check your e-mail for activation link!",
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Invalid authentication credentials!",
          });
        });
    });
  }

exports.loginUser =  (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
  
        fetchedUser = user;
        console.log("fetcheduser" + fetchedUser + "user" + user);
  
        if (!fetchedUser.active) {
          console.log("Please verify your e-mail.");
  
          return res.status(401).json({
            message: "Please verify your e-mail.",
          });
        } else {
          return bcrypt.compare(req.body.password, user.password);
        }
      })
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        // cretea new token based on some inputdata of your choice ( in our case my input is a javascript object {})
        const token = jwt.sign(
          {
            email: fetchedUser.email,
            userId: fetchedUser._id,
            role: fetchedUser.role,
          },
          "secret_this_should_be_longer",
          { expiresIn: "1h" }
        );
        //  zeyed  !
        // token for only admin
        //  if( fetchedUser.role === 'admin'){
        // const adminToken = jwt.sign(
        //   {   email: fetchedUser.email, userId: fetchedUser._id, role:  fetchedUser.role},
        //   "secret_admin_this_should_be_longer",
        //   { expiresIn: "1h" }
        // );
        // console.log("Admin token from the back: " + adminToken);
        // console.log("token from the back: " + token);
        // res.status(200).json({
        //   token: token,
        //   adminToken: adminToken,
        //   expiresIn: 3600,
        //   userId: fetchedUser._id,
        //   name: fetchedUser.name,
        //   role: fetchedUser.role,
        // });
        // }
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchedUser._id,
          name: fetchedUser.name,
          role: fetchedUser.role,
          email: fetchedUser.email,
          imagePath: fetchedUser.imagePath,
        });
      })
      .catch((err) => {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      });
  }

exports.updatePassword = async (req, res, next) => {
    // get the token.
    const token = req.params.passwordToken;
    console.log(" password Token from the back: " + token);
  
    // get the new password.
    let newmadafakapassword = req.body.newPassword;
    let newMadafakaPasswordHashed = newmadafakapassword;
    console.log("the written password : " + newmadafakapassword);
  
    let user = await User.findOne({ passwordToken: token });
  
    // const nnewPassword = user.password;
    // console.log("the old hashed password : " + nnewPassword);
  
    if (user) {
      console.log("new password in the if condition : " + newmadafakapassword);
      // the bcrypt methode should be async (error!)
      //so that the updateone method can save the password hashed.
      await bcrypt.hash(newmadafakapassword, 10).then((hashed) => {
        user.password = hashed;
        newmadafakapassword = hashed;
        newMadafakaPasswordHashed = hashed;
        console.log(
          "hashed password in the bcrypt fun " + newMadafakaPasswordHashed
        );
      });
  
      console.log("hashed password 2 " + newmadafakapassword);
      await user.updateOne({
        passwordToken: "",
        password: newMadafakaPasswordHashed,
      });
  
      // //  hash the password.
      // console.log("newpassword hashed : " + req.body.password );
      console.log("here");
      res.status(200).send({ message: " passwordToken success" });
    } else {
      res.status(404).send({ message: "wrong password Token " });
    }
}
exports.sendEmailUpdatePassword = async (req, res, next) => {
    let fetchedUser;
    // User.findOne({ email: req.body.email })
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      // create a new passwordToken to send it
      let news = randomstring.generate();
      await user.updateOne({ passwordToken: news });
      console.log(" new passwordtoken to reset is: " + news);
      const msg = {
        to: user.email,
        from: "youssef.benhajsalah@medtech.tn",
        subject: "Reset password",
        text:
          "please copy the code below Code " +
          news +
          " and paste it here http://localhost:4200/verify",
        html:
          "Hi " +
          user.name +
          '<br> <strong> Please click on this link to reset your password. </strong> <a href="http://localhost:4200/resetpassword/' +
          news +
          '">http://localhost:4200/resetpassword/' +
          news +
          "</a> <br><br>Thank you. ",
      };
      return sgMail
        .send(msg)
        .then(() => {
          console.log("reset password link sent!");
        })
        .catch((error) => {
          console.log(error.response.body);
          // console.log(error.response.body.errors[0].message)
        });
    } else {
      return res.status(401).json({
        message: "E-mail not found!",
      });
    }
  
    fetchedUser = user;
    console.log("fetcheduser" + fetchedUser + "user" + user);
  
    // .then((result) => {
    //   if (!result) {
    //     return res.status(401).json({
    //       message: "Error occured please give a valid E-mail",
    //     });
    //   }
  
    // })
    // .catch((err) => {
    //   return res.status(401).json({
    //     message: "Invalid email",
    //   });
    // });
  }
exports.activeUser = async (req, res, next) => {
    const token = req.params.secretToken;
    console.log("secret token from the back: " + token);
    let user = await User.findOne({ secretToken: token });
    if (user) {
      await user.updateOne({ active: true, secretToken: "" });
      console.log("here");
      res.status(200).send({ message: "success" });
    } else {
      res.status(404).send({ message: "wrong secret token" });
    }
  }
exports.getUsers = async (req, res) => {
    let users = await User.find().select("_id name email imagePath");
    res.send(users);
}