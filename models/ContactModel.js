const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: Number, required: true },
    user: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const ContactModel = mongoose.model("contact", contactSchema);

module.exports = {
  ContactModel,
};
