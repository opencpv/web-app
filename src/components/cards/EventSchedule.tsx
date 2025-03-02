import { greatVibes } from "@/app/fonts/font";

interface EventScheduleCardProps {
  schedule: {
    date: string;
    event: string;
  }[];
}

const EventScheduleCard = ({ schedule }: EventScheduleCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className={`${greatVibes.className} text-3xl mb-4`}>
        Event Schedule
      </h2>
      <div className="space-y-4">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:felx-row items-start gap-2 md:gap-4 text-gray-600"
          >
            <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
              {item.date}
            </div>
            <div>{item.event}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventScheduleCard;
