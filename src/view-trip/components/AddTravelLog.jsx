import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTravelLog() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user from storage", user?.given_name);
  const [form, setForm] = useState({
    user_name: user?.given_name ? user?.given_name : "",
    action: "",
    location: "",
    notes: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () =>
        setForm((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!form.user_name || !form.action || !form.location) {
      alert("Please fill required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("user_name", form.user_name);
    formData.append("action", form.action);
    formData.append("location", form.location);
    formData.append("notes", form.notes);
    if (form.imageFile) formData.append("image", form.imageFile);

    try {
      const res = await fetch(
        "https://wanderguide.thenetbotz.com/api/travel-logs",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.success) {
        alert("Travel log saved successfully!");
        navigate("/view-logs");
      } else {
        alert("Failed to save log.");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving log.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=1600&q=80')",
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          ✍️ Add Travel Log
        </h2>

        {/* User Name */}
        <label className="block mb-2 font-semibold text-gray-700">
          User Name*
        </label>
        <input
          type="text"
          name="user_name"
          value={form.user_name}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full mb-4 focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your name"
        />

        <label className="block mb-2 font-semibold text-gray-700">
          Action*
        </label>
        <select
          name="action"
          value={form.action}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full mb-4 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Action</option>
          <option value="Started">Started</option>
          <option value="Stopped">Stopped</option>
          <option value="Resumed">Resumed</option>
        </select>

        <label className="block mb-2 font-semibold text-gray-700">
          Location*
        </label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full mb-4 focus:ring-2 focus:ring-blue-400"
          placeholder="Enter location or coordinates"
        />

        <label className="block mb-2 font-semibold text-gray-700">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full mb-4 focus:ring-2 focus:ring-blue-400"
          placeholder="Add any extra details..."
        />

        <label className="block mb-2 font-semibold text-gray-700">
          Upload Picture
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />

        {form.image && (
          <div className="mb-4">
            <img
              src={form.image}
              alt="Preview"
              className="max-h-40 border rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow-md"
          >
            Save Log
          </button>
          <button
            onClick={() => navigate("/view-logs")}
            className="bg-gray-500 hover:bg-gray-600 transition text-white px-4 py-2 rounded-lg shadow-md"
          >
            View Logs
          </button>
        </div>
      </div>
    </div>
  );
}
