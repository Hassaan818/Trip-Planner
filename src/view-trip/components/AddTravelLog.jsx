import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTravelLog() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    action: "",
    location: "",
    notes: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result }); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!form.action || !form.location) {
      alert("Please fill required fields.");
      return;
    }

    const logs = JSON.parse(localStorage.getItem("travelLogs")) || [];
    const newLog = {
      ...form,
      time: new Date().toLocaleString(),
    };
    logs.push(newLog);
    localStorage.setItem("travelLogs", JSON.stringify(logs));
    navigate("/view-logs");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=1600&q=80')"
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          ✍️ Add Travel Log
        </h2>

        <label className="block mb-2 font-semibold text-gray-700">Action*</label>
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
