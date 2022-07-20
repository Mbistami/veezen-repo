import React from "react";
import { motion } from "framer-motion";
import { Add } from "@mui/icons-material";
import { Typography, Button } from "@mui/material";

export interface DashCardProps {
  title: string;
  children: React.ReactElement;
  fullWidth?: boolean;
  colSpan?: number;
  pChild?: number;
  subtitle?: string;
  buttons?: any[];
  lockHeight?: string;
}

export const DashCard = ({
  title,
  children,
  fullWidth,
  colSpan,
  pChild,
  subtitle,
  buttons,
  lockHeight,
}: DashCardProps) => {
  return (
    <div
      className={`flex ${
        lockHeight ? lockHeight : "overflow-y-hidden"
      } overflow-x-hidden flex-col w-full min-w-[200px] h-full rounded-3xl border border-gray-300 hover:shadow-md duration-300 cursor-pointer  ${
        colSpan && "col-span-" + colSpan
      }`}
    >
      <motion.div
        className="col-span-4 py-4 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-row justify-between">
          <p className="font-primary text-2xl font-bold text-gray-900 ">
            {title}
          </p>
          {buttons?.length > 0 &&
            buttons.map((e, i) => {
              return (
                <Button onClick={e?.handler} endIcon={<Add />} key={i}>
                  {e?.label}
                </Button>
              );
            })}
        </div>
        {subtitle && (
          <Typography className="font-primary m-0">{subtitle}</Typography>
        )}
      </motion.div>

      <div className={`col-span-2 p-${pChild ? pChild : 0}`}>{children}</div>
    </div>
  );
};
