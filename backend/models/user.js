const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  name: { type: String, required: false, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: false },
  role: { type: String, required: true },
  secretToken: { type: String, required: true },
  events: [],
  passwordToken: { type: String, required: false },
  imagePath: { type: String, required: false}
});

//  userSchema.plugin(uniqueValidator);
//  // TODO:

module.exports = mongoose.model("User", userSchema);
