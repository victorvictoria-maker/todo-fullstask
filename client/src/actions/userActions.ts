import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ActionState } from "../lib/types";

const apiUrl = import.meta.env.VITE_API_URL;

export const useSuccessRedirect = (
  success: boolean,
  to: string,
  delay?: number
): void => {
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate(to), delay);
      return () => clearTimeout(timer);
    }
  }, [success, to, delay, navigate]);
};

export async function register(prevState: ActionState, formData: FormData) {
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

export async function login(prevState: ActionState, formData: FormData) {
  try {
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email) {
      return { ...prevState, error: "Valid email is required." };
    }

    if (!password) {
      return { ...prevState, error: "Password is required." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { ...prevState, error: "Valid email is required." };
    }

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
