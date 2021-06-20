const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const adminToken = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(adminToken, "secret_admin_this_should_be_longer");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId, role:decodedToken.role} ;
    next();
  } catch (error) {
    res.status(401).json({ message: "you are not admin . please log in to process." });
  }
};
