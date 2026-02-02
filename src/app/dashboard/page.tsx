"use client";
import DataPanel from "@/components/DataPanel";
import Sidebar from "@/components/Sidebar";
import IndiaData from "@/data/response1.json";
import IMFData from "@/data/response2.json";
import type { EconomicData } from "@/types";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [selectedOption, setSelectedOption] = useState("India");
  const [economicData, setEconomicData] = useState<EconomicData>(
    IndiaData as EconomicData
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("auth")) {
      setIsAuthenticated(true);
    } else if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "India")
      setEconomicData(IndiaData as EconomicData);
    else if (event.target.value === "IMF")
      setEconomicData(IMFData as EconomicData);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-[100vh] w-screen bg-gradient-to-br from-background via-background to-muted/10 overflow-hidden">
      <Sidebar
        categories={economicData.categories}
        selectedOption={selectedOption}
        handleChange={handleChange}
      />
      <div
        className="flex-1 overflow-y-auto"
        style={{ width: "calc(100% - 300px)" }}
      >
        <DataPanel economicData={economicData} />
      </div>
    </div>
  );
}
