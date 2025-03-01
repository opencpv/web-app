import { HackathonDetailed } from "@/lib/types";
import ButtonComponent from "../ui/button/Button";
import { useRouter } from "next/navigation";

interface HackathonCardProps {
  hackathon: HackathonDetailed;
  viewMode: "grid" | "list";
}
const HackathonCard = ({ hackathon, viewMode }: HackathonCardProps) => {
  const router = useRouter();

  const calculateTimeRemaining = () => {
    const deadline = new Date(hackathon.deadline);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Ended";
    if (diffDays === 0) return "Last day";
    if (diffDays < 30) return `${diffDays} days left`;

    const months = Math.floor(diffDays / 30);
    const remainingDays = diffDays % 30;
    return `${months}m ${remainingDays}d left`;
  };

  return (
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
          src={hackathon.image_url}
          alt={hackathon.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
          {hackathon.prize_pool}
        </div>
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {calculateTimeRemaining()}
        </div>
      </div>

      <div className="p-6 flex flex-col h-full flex-grow">
        <h2 className="text-xl font-bold mb-3">{hackathon.title}</h2>
        <p className="text-gray-300 mb-4 flex-grow">{hackathon.summary}</p>

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
            <span className="text-gray-300">{hackathon.team_size} members</span>
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
          <ButtonComponent
            text="View Details"
            onClick={() => {
              router.push(
                `/hackathons/${hackathon.id}?title=${hackathon.title}`
              );
            }}
            variant="solid"
          />
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
