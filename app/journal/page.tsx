import { getCaffeineHistory } from "../lib/data";
import { format } from "date-fns";

export default async function Journal() {
  const days = await getCaffeineHistory();

  return (
    <div className="w-full h-full flex flex-row justify-center pr-10">
      <div className="w-[600px] h-screen flex-col flex border-x-2 overflow-y-scroll border-primary no-scrollbar pt-10 px-4">
        <h1 className="text-3xl py-4">Journal</h1>
        {days.map((day) => (
          <div
            key={day.date}
            className="rounded bg-[#ece0d1] p-4 h-auto w-full flex flex-col"
          >
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-lg">
                {format(new Date(day.date), "MMMM do, yyyy")}
              </h1>
              <p className="text-md text-primary">
                {day.caffeine} mg, {day.items} drinks
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
