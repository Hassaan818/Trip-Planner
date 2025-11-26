import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Not logged in → redirect to home page
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
