import { UserDTO } from "../types/user.type";

export const API_URL = "http://localhost:8000";

export const signin = async (credentials: UserDTO) => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  console.log("coucou");
  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.message || `Request failed with status ${response.status}`
    );
  }

  const data = await response.json();
  console.log(data.access_token);

  return data.access_token;
};

export const signup = async (credentials: UserDTO) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Request failed with status ${response.status}`
    );
  }

  const data = await response.json();

  return data;
};

export default {
  signin,
  signup,
};
