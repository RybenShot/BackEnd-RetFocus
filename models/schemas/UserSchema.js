const { Schema } = require("mongoose")

let userSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, maxlength: 200 },
  nickName: { type: String, required: true, minlength: 3, maxlength: 100, unique: true },
  image: { type: String, required: false },
  profile: { type: String, required: false, default: 'user' },
  // enabled: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = userSchema
