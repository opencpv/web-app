"use client";
import Link from "next/link";

export default function Admin() {
  const adminCards = [
    {
      title: "Categories",
      description: "Manage and organize content categories",
      link: "/admin/categories",
      icon: "📁",
    },
    {
      title: "Tags",
      description: "Manage content tags and classifications",
      link: "/admin/tags",
      icon: "🏷️",
    },
    {
      title: "Hackathons",
      description: "Manage hackathon listings and details",
      link: "/admin/hackathons",
      icon: "💻",
    },
    {
      title: "Grants",
      description: "Manage grant opportunities and applications",
      link: "/admin/grants",
      icon: "💰",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card, index) => (
          <Link href={card.link} key={index}>
            <div className="bg-white rounded-lg shadow-md p-6 hover:border-2 border-2 border-transparent hover:border-yellow-400 transition-all duration-300">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
