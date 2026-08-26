"use client";

import { useRef } from "react";

import thumbnail from "@/assets/images/landingPage/thumbnail.jpg";

const PlayVideo = () => {
  const videoRef = useRef(null);

  return (
    <video
      ref={videoRef}
      src="/videos/ingredient_video.mp4"
      muted
      playsInline
      poster={thumbnail.src}
      loop={true}
      controls={false}
      allowFullScreen={false}
      autoPlay={true}
      className="w-full aspect-square h-70 object-cover rounded-xl"
    />
  );
};

export default PlayVideo;