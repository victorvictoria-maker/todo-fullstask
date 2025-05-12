export async function isAuthenticated(): Promise<boolean> {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/auth`, {
      method: "GET",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}
