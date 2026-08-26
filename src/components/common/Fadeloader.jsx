"use client";

import React from "react";
import { FadeLoader } from "react-spinners";

const Fadeloader = () => {
  return (
    <div className="w-full min-h-[50vmin] flex justify-center items-center">
      <FadeLoader color="#61b9b9" />
    </div>
  );
};

export default Fadeloader;