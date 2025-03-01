import { AdPlacement } from "@/lib/types";

{
  /* Sidebar Ad */
}
export const InlineAd = ({
  image,
  title,
  sponsor,
  description,
  link,
}: AdPlacement) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <span className="absolute top-2 right-2 text-xs font-semibold bg-black/20 text-white px-2 py-1 rounded">
          SPONSORED
        </span>
      </div>
      <div className="p-6">
        <span className="text-sm text-gray-500 mb-2 block">{sponsor}</span>
        <h3 className="text-lg font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-300 w-full text-center"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};
