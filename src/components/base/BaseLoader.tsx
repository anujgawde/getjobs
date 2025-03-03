import React from "react";

const BaseLoader = ({ color = "primary", size = "12", borderSize = "4" }) => {
  return (
    <div
      className={`w-${size} h-${size} border-${borderSize} border-t-${borderSize} border-gray-200 border-t-${color} rounded-full animate-spin`}
    ></div>
  );
};

export default BaseLoader;
