interface FeaturedCardProps {
  image: string;
  title: string;
  description: string;
  deadline: string;
}
const FeaturedCard = ({
  image,
  title,
  description,
  deadline,
}: FeaturedCardProps) => {
  return (
    <div className="bg-zinc-700 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300">
      <div className="h-48 bg-gray-300">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-yellow-400">{deadline}</span>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
