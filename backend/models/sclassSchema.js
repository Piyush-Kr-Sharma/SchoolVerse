const mongoose = require("mongoose");

const sclassSchema = new mongoose.Schema(
  {
    sclassName: {
      type: String,
      required: true,
    },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "subject" }],
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("sclass", sclassSchema);
