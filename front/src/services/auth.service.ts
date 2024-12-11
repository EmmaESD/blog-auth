const API_URL = import.meta.env.VITE_API_URL;

export const signin = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Échec de la connexion");
  }

  const data = await response.json();

  localStorage.setItem("token", data.token);
};
