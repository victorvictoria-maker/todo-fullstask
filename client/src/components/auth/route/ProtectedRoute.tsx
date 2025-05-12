import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    isAuthenticated().then((auth: boolean) => {
      if (!auth) navigate("/login");
      else setLoading(false);
    });
  }, [navigate]);

  return loading ? null : children;
};

export default ProtectedRoute;
