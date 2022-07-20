import React from "react";
import Image from "next/image";
import useWindowSize from "@hooks/useWindowSize";
import { ResponsiveContainer } from "recharts";
import { DashCard, DashCardProps } from "./DashCard";

interface SummaryCardProps {
  title: string;
  value: string;
  perUnit?: string;
  icon: string;
}

export const SummaryCard = ({
  title,
  value,
  perUnit,
  icon,
}: SummaryCardProps) => {
  return (
    <div className="grid grid-cols-6 p-2 w-1/3 h-full rounded-3xl border border-gray-300 hover:shadow-md duration-300 cursor-pointer xl:w-full">
      <div className="flex col-span-2 justify-center items-center">
        <Image src={icon} alt={icon} width={80} height={80} layout="fixed" />
      </div>
      <div className="col-span-4 p-3">
        <p className="text-sm font-extralight text-gray-400 ">{title}</p>
        <div className="flex items-center">
          <p className="py-2 font-primary text-2xl font-bold text-gray-900">
            {value}
          </p>
          {perUnit && (
            <p className="pl-3 font-primary text-xl text-gray-400">
              {"/ " + perUnit}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const ChartCard = ({ title, children }: DashCardProps) => {
  const size = useWindowSize();
  // React.useEffect(() => {}, [size]);
  return (
    <DashCard title={title}>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        {children}
      </ResponsiveContainer>
    </DashCard>
  );
};
