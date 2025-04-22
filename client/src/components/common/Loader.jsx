import { loaderStyle } from "@/config";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <span style={loaderStyle}>🛒Loading...</span>
      <style>
        {`
              @keyframes l3 {
                0% {
                  background-position: 100%;
                }
              }
            `}
      </style>
    </div>
  );
};

export default Loader;
