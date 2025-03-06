import Link from "next/link";

interface LinkPageCardProps {
  icon: string;
  title: string;
  description: string;
  clickable?: boolean;
  link?: string;
}

const LinkPageCard = ({
  icon,
  title,
  description,
  clickable = true,
  link,
}: LinkPageCardProps) => {
  const commonClasses =
    "block bg-white p-6 rounded-lg shadow-md text-left border-2 border-transparent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-yellow-50 hover:border-yellow-400";
  const clickableClasses = "group";

  const content = (
    <>
      <div
        className={` text-yellow-400 text-4xl mb-4 hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3
        className={`text-xl text-black font-bold mb-2 hover:text-yellow-600 transition-colors duration-300`}
      >
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </>
  );

  if (!clickable) {
    return <div className={commonClasses}>{content}</div>;
  }

  return (
    <Link href={link || ``} className={`${commonClasses} ${clickableClasses}`}>
      {content}
    </Link>
  );
};

export default LinkPageCard;
