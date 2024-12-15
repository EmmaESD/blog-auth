import { PostType } from "../types/post.type";

const API_URL = "http://localhost:8000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.warn("Aucun token JWT trouvé dans le localStorage.");
  }
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

const handleResponse = async (response: Response) => {
  console.log("Réponse du serveur :", response);
  const responseText = await response.text();

  try {
    const responseData = JSON.parse(responseText);
    console.log("Données de la réponse :", responseData);

    const newToken = responseData.token;
    if (newToken) {
      const token = newToken;
      localStorage.setItem("jwtToken", token);
      console.log("Nouveau token enregistré :", token);
    }

    if (!response.ok) {
      throw new Error(responseData.message || "Une erreur est survenue.");
    }
    return responseData;
  } catch (error) {
    console.error("Réponse du serveur (non-JSON) :", responseText);
    throw new Error(responseText || "Une erreur inattendue est survenue.");
  }
};

export const findAll = async () => {
  const response = await fetch(`${API_URL}/posts`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const findPostById = async (id: number) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const findByUser = async (id: number) => {
  const response = await fetch(`${API_URL}/posts/user/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const createPost = async (credentials: PostType) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

export const updatePost = async (id: number, credentials: PostType) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

export const removePost = async (id: number) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};
