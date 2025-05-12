import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../lib/auth";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    isAuthenticated().then((auth: boolean) => {
      if (auth) navigate("/");
      else setLoading(false);
    });
  }, [navigate]);

  return loading ? null : children;
};

export default PublicRoute;
