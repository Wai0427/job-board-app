import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function JobForm({ isEdit = false }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary_range: "",
    is_remote: false,
    status: "draft",
  });

  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      api.get(`/employer/jobs/${id}`).then((res) => {
        setForm(res.data);
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      if (isEdit) {
        await api.put(`/jobs/${id}`, form);
      } else {
        await api.post("/jobs", form);
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Job submission error:", err.response?.data);

      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{isEdit ? "Edit" : "Post"} Job</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-sm"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border w-full p-2"
            required
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title[0]}</p>}
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border w-full p-2"
            required
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description[0]}</p>}
        </div>

        <div>
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="border w-full p-2"
            required
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location[0]}</p>}
        </div>

        <div>
          <input
            name="salary_range"
            placeholder="Salary Range"
            value={form.salary_range}
            onChange={handleChange}
            className="border w-full p-2"
          />
          {errors.salary_range && <p className="text-red-500 text-sm">{errors.salary_range[0]}</p>}
        </div>

        <label className="block">
          <input
            type="checkbox"
            name="is_remote"
            checked={form.is_remote}
            onChange={handleChange}
          /> Remote?
        </label>
        {errors.is_remote && <p className="text-red-500 text-sm">{errors.is_remote[0]}</p>}

        <div>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border w-full p-2"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status[0]}</p>}
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {isEdit ? "Update" : "Post"} Job
        </button>
      </form>
    </div>
  );
}
