import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className = "", hover = true, style }) => {
  return (
    <div
      className={`
        rounded-xl bg-softIvory border border-champagne/60 crt-subtle
        ${hover ? "shadow-card hover:shadow-card-hover transition-shadow duration-200" : "shadow-card"}
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  );
};
