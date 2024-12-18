import { PostType } from "../types/post.type";

type CardPostProps = {
  post: PostType;
};

const CardPost = ({ post }: CardPostProps) => {
  return (
    <div className="flex flex-col items-center justify-between w-80 rounded-lg overflow-hidden shadow-lg bg-white hover:greenLight transition-shadow duration-300">
      {/* Image */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />

      {/* Contenu de la carte */}
      <div className="flex flex-col items-center justify-between p-5 h-full">
        {/* Titre */}
        <h1 className="text-md font-semibold text-gray-900 truncate">
          {post.title}
        </h1>

        <a
          href={`/post/${post.id}`} // Exemple de lien vers le post
          className="inline-block mt-4 px-6 py-2 text-white rounded-md bg-violetDark transition-colors duration-200"
        >
          Voir l'article
        </a>
      </div>
    </div>
  );
};

export default CardPost;
