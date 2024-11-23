import H1 from "@/app/admin/_components/Typo/H1";

import Users from "./Section/Users";
import Jobs from "./Section/Jobs";

export default function Dashboard() {
  return (
    <>
      <header className="mb-8">
        <H1>Fly Smart Deals - Admin Panel</H1>
        <h3 className="text-neutral-500 text-base">
          Fly Smart Deals - Admin Panel
        </h3>
      </header>
      <div className="grid grid-cols-2 gap-4">
        <Users />
        <Jobs />
      </div>
    </>
  );
}
