import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDTO } from "../types/user.type";
import { signin } from "../services/auth.service";

const FormSignIn = () => {
  const [credentials, setCredentials] = useState<UserDTO>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = await signin(credentials);

      if (token == undefined) {
        return;
      }

      localStorage.removeItem("access_token");
      localStorage.setItem("access_token", token);

      setCredentials({
        username: "",
        password: "",
      });

      navigate("/");

      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la connexion de l'utilisateur", error);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <div className="mx-auto flex items-center max-w-sm">
      <form
        onSubmit={handleSubmit}
        className=" gap-4 flex flex-col justify-center "
      >
        <h2 className="text-center">Login</h2>
        <div className="flex flex-col gap-2 w-full">
          <label>Nom d'utilisateur</label>
          <input
            className="w-full bg-bgGrey text-dark p-2 rounded-md"
            id="username"
            onChange={handleChange}
            name="username"
            type="text"
            value={credentials.username}
            placeholder="John"
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Mot de passe</label>
          <input
            className="w-full bg-bgGrey text-dark p-2 rounded-md"
            onChange={handleChange}
            placeholder="********"
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-violetLight text-dark p-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default FormSignIn;
