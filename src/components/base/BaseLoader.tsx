import React from "react";

const BaseLoader = ({
  colorClasses = "border-t-primary",
  sizeClasses = "h-12 w-12",
  borderClasses = "border-4 border-t-4",
}) => {
  return (
    <div
      className={`${sizeClasses} ${colorClasses} ${borderClasses} border-gray-200  rounded-full animate-spin`}
    ></div>
  );
};

export default BaseLoader;
