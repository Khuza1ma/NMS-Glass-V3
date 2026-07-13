import React from "react";
import { FiAlertCircle } from "react-icons/fi";

interface AlertProps {
  message: string;
}

export default function Alert({ message }: AlertProps) {
  return (
    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-xl flex items-center gap-3 text-sm">
      <FiAlertCircle className="text-lg flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
