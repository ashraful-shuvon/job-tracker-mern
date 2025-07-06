const Job = require("../models/Job");

// GET all jobs for a user
const getJobs = async (req, res) => {
  const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(jobs);
};

// CREATE job
const createJob = async (req, res) => {
  const { position, company, status, location } = req.body;
  const job = await Job.create({
    user: req.user._id,
    position,
    company,
    status,
    location,
  });
  res.status(201).json(job);
};

// UPDATE job
const updateJob = async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
};

// DELETE job
const deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json({ message: "Job deleted" });
};

module.exports = { getJobs, createJob, updateJob, deleteJob };
