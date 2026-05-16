"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", hover = true }) => {
  return (
    <div
      className={`
        rounded-xl bg-softIvory border border-champagne/60 crt-subtle
        ${hover ? "shadow-card hover:shadow-card-hover transition-shadow duration-200" : "shadow-card"}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
