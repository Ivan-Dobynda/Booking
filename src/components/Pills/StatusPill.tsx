import { classNames } from "@/lib/helpers";

interface StatusPillProps {
  status: string;
}

const StatusPill = ({ status }: StatusPillProps) => {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full px-4 py-1.5 text-sm leading-none ring-1 ring-inset capitalize",
        status === "hold"
          ? " bg-yellow-50 text-yellow-700 ring-yellow-600/30"
          : "",
        status === "confirmed"
          ? " bg-green-50 text-green-700 ring-green-600/30"
          : "",
        status === "expired" ? " bg-red-50 text-red-700 ring-red-600/30" : ""
      )}
    >
      {status}
    </span>
  );
};

export default StatusPill;
