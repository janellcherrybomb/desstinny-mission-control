"use client";

import React from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && <div className="mb-4 text-mutedText">{icon}</div>}
      <h3 className="text-sm font-medium text-oceanSlate">{title}</h3>
      <p className="mt-1 text-xs text-mutedText max-w-xs">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-1.5 text-xs font-medium rounded-md bg-softTeal text-oceanSlate hover:bg-softTeal/80 transition-colors duration-200"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
