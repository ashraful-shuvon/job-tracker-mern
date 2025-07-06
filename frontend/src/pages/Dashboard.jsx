import { useEffect, useState } from "react";
import axios from "axios";
import JobList from "../components/JobList.jsx";
import JobForm from "../components/JobForm.jsx";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5001/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddClick = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    if (!confirm("Delete this job?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  const handleFormSubmit = async (jobData) => {
    try {
      if (editingJob) {
        // Update job
        const res = await axios.patch(
          `http://localhost:5001/api/jobs/${editingJob._id}`,
          jobData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setJobs(
          jobs.map((job) => (job._id === editingJob._id ? res.data : job))
        );
      } else {
        // Create new job
        const res = await axios.post(
          "http://localhost:5001/api/jobs",
          jobData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setJobs([...jobs, res.data]);
      }
      setShowForm(false);
      setEditingJob(null);
    } catch (err) {
      alert("Failed to save job");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) return <p className="p-4 text-center">Loading jobs...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Jobs</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <button
        onClick={handleAddClick}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Add Job
      </button>

      {showForm && (
        <JobForm
          initialData={editingJob}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingJob(null);
          }}
        />
      )}

      <JobList
        jobs={jobs}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
}
