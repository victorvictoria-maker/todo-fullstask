import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export const useSuccessRedirect = (success, to, delay = 2000) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate(to), delay);
      return () => clearTimeout(timer);
    }
  }, [success, to, delay, navigate]);
};

export async function register(prevState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    // console.log({ email, password });

    const res = await fetch(`${apiUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.error) {
      return { ...prevState, error: data.error };
    }
    return { error: null, success: data };
  } catch {
    return { ...prevState, error: "Something went wrong." };
  }
}

export async function login(prevState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    // console.log({ email, password });

    const res = await fetch(`${apiUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.error) {
      return { ...prevState, error: data.error };
    }
    return { error: null, success: data };
  } catch {
    return { ...prevState, error: "Something went wrong." };
  }
}
