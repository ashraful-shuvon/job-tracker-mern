const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    position: { type: String, required: true },
    company: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    location: { type: String, default: "Remote" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
