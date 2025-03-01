import { greatVibes } from "@/app/fonts/font";
import { HackathonDetailed } from "@/lib/types";
import Link from "next/link";

const HackathonDetailHero = (hackathon: HackathonDetailed) => {
  return (
    <section className="relative h-96">
      <div className="absolute inset-0">
        <img
          src={hackathon.banner}
          alt={hackathon.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
        <div className="text-white">
          <Link
            href="/hackathons"
            className="inline-flex items-center text-yellow-400 mb-4 hover:text-yellow-300"
          >
            ← Back to Hackathons
          </Link>
          <h1 className={`${greatVibes.className} text-5xl mb-4`}>
            {hackathon.title}
          </h1>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
              {hackathon.prize_pool}
            </span>
            <span className="bg-zinc-700 px-4 py-2 rounded-full">
              Deadline: {hackathon.deadline}
            </span>
            <span className="bg-zinc-700 px-4 py-2 rounded-full">
              {hackathon.mode}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HackathonDetailHero;
