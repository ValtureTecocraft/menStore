import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="w-full h-screen fixed z-50 backdrop-blur-md">
      <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 ">
        Loading...
      </div>
    </div>
  );
};

export default Loading;
