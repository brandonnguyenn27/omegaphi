"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RushPage() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col h-[83vh]">
      <h1 className="text-3xl font-bold mb-4 ml-2">Rush</h1>
      <div className="flex flex-wrap w-full h-full">
        <div className="w-1/2 h-1/2 p-1">
          <Button
            className="w-full h-full"
            onClick={() => handleNavigation("/rush/interviews")}
          >
            Interviews
          </Button>
        </div>
        <div className="w-1/2 h-1/2 p-1">
          <Button
            className="w-full h-full"
            onClick={() => handleNavigation("/rush/another-route")}
          >
            Another Route
          </Button>
        </div>
        <div className="w-1/2 h-1/2 p-1">
          <Button
            className="w-full h-full"
            onClick={() => handleNavigation("/rush/yet-another-route")}
          >
            Yet Another Route
          </Button>
        </div>
        <div className="w-1/2 h-1/2 p-1">
          <Button
            className="w-full h-full"
            onClick={() => handleNavigation("/rush/final-route")}
          >
            Final Route
          </Button>
        </div>
      </div>
    </div>
  );
}
