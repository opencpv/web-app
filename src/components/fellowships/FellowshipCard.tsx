import Link from "next/link";
import { Fellowship } from "@/types/fellowship";

type Props = {
  fellowship: Fellowship;
};

export function FellowshipCard({ fellowship }: Props) {
  return (
    <Link href={`/fellowships/${fellowship.slug}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">{fellowship.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {fellowship.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Duration: {fellowship.duration}</span>
          <span>Starts: {fellowship.startDate}</span>
        </div>
      </div>
    </Link>
  );
}
