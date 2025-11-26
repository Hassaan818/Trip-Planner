import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewTravelLogs() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/travel-logs"
        );
        const data = await res.json();
        setLogs(data.data || []);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?fit=crop&w=1600&q=80')",
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          📓 Travel Logs
        </h2>

        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate("/add-log")}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow-md"
          >
            ➕ Add New Log
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading logs...</p>
        ) : logs.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No logs yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
              >
                {log.image && (
                  <img
                    src={
                      log.image.startsWith("http")
                        ? log.image
                        : `http://127.0.0.1:8000${log.image}`
                    }
                    alt="Log"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  {/* user_name */}
                  {log.user_name && (
                    <p className="text-sm font-semibold text-gray-700">
                      👤 {log.user_name}
                    </p>
                  )}

                  <h3 className="text-lg font-bold text-gray-800 mt-1">
                    {log.action}
                  </h3>

                  <p className="text-gray-600">
                    📍 <span className="font-semibold">{log.location}</span>
                  </p>

                  {log.notes && (
                    <p className="mt-2 text-gray-700">{log.notes}</p>
                  )}

                  <p className="text-xs text-gray-500 mt-3">
                    {new Date(log.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
