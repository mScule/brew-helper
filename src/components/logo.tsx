import { Coffee } from "lucide-react";

export function Logo() {
  return (
    <div className="flex flex-row gap-3 items-center w-fit h-fit px-3">
      <span className="text-xl font-bold">brew helper</span>
      <Coffee />
    </div>
  );
}
