import Link from "next/link";

interface CategoryCardProps {
  icon: string;
  title: string;
  description: string;
}
const CategoryCard = ({ icon, title, description }: CategoryCardProps) => {
  return (
    <Link
      href={`/categories/${title.toLowerCase()}`}
      className="group block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-left transform hover:-translate-y-2 hover:bg-yellow-50 border-2 border-transparent hover:border-yellow-400"
    >
      <div className="text-yellow-400 text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};

export default CategoryCard;
