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
      //on envoie la requête de signin avec les identifiants et on récupère le token
      console.log("bonjour");
      const token = await signin(credentials);
      console.log("aurevoir" + token);
      // si on ne reçois pas de token il y a un problème et on stoppe le code ici
      if (token == undefined) {
        return;
      }

      // enregistrement du token dans le local storage
      localStorage.removeItem("access_token");
      localStorage.setItem("access_token", token);

      // reset des champs du formulaire
      setCredentials({
        username: "",
        password: "",
      });

      // retour à la page d'accueil
      navigate("/");
      // actualisation de toutes la page pour mettre à jour tout les components s'éxécutant seulement quand un compte est connecté
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
    <div className="mx-auto max-w-sm">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <input
            id="username"
            onChange={handleChange}
            name="username"
            type="text"
            value={credentials.username}
            placeholder="pseudo"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center"></div>
          <input
            onChange={handleChange}
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            required
          />
        </div>
        <button type="submit" className="w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default FormSignIn;
