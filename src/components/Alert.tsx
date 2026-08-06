import React from "react";
import { FiAlertCircle } from "react-icons/fi";

interface AlertProps {
  message: string;
}

export default function Alert({ message }: AlertProps) {
  return (
    <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 p-4 rounded-xl flex items-center gap-3 text-sm">
      <FiAlertCircle className="text-lg flex-shrink-0 text-amber-600 dark:text-amber-400" />
      <span>{message}</span>
    </div>
  );
}
