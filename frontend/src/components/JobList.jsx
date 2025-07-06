export default function JobList({ jobs, onEdit, onDelete }) {
  if (!jobs.length) return <p>No jobs found.</p>;

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="border p-4 rounded shadow hover:shadow-md transition flex justify-between items-center"
        >
          <div>
            <h2 className="text-xl font-semibold">{job.position}</h2>
            <p className="text-gray-700">{job.company}</p>
            <p className="text-sm text-gray-500">Status: {job.status}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(job)}
              className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(job._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
