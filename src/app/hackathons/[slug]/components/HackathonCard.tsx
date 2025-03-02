import { Hackathon } from "@/lib/types";

interface HackathonCardProps {
  hackathon: Hackathon;
  viewMode: "grid" | "list";
}
const HackathonCard = ({ hackathon, viewMode }: HackathonCardProps) => {
  return (
    <>
      <div
        key={hackathon.id}
        className={`bg-zinc-700 text-white rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition duration-300 flex ${
          viewMode === "list" ? "flex-row" : "flex-col"
        }`}
      >
        <div
          className={`${
            viewMode === "list" ? "w-72" : "h-48"
          } bg-gray-300 relative`}
        >
          <img
            src={hackathon.image}
            alt={hackathon.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
            {hackathon.prizePool}
          </div>
        </div>

        <div className="p-6 flex flex-col h-full flex-grow">
          <h2 className="text-xl font-bold mb-3">{hackathon.title}</h2>
          <p className="text-gray-300 mb-4 flex-grow">
            {hackathon.description}
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⏰</span>
              <span className="text-gray-300">{hackathon.deadline}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">🏢</span>
              <span className="text-gray-300">{hackathon.organizer}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">👥</span>
              <span className="text-gray-300">{hackathon.teamSize}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⌛</span>
              <span className="text-gray-300">{hackathon.duration}</span>
            </div>

            <div className="pt-4 border-t border-zinc-600">
              <span className="inline-block bg-zinc-600 px-3 py-1 rounded-full text-sm hover:bg-yellow-400 hover:text-black transition duration-300">
                {hackathon.mode}
              </span>
            </div>

            <button className="w-full bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 transition duration-300 mt-4">
              View Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HackathonCard;
