import { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import { store } from "../../../stores/VideoStore";
import { observer } from "mobx-react-lite";

interface VideoPlayerProps {
  options: {
    autoplay: boolean;
    controls: boolean;
    sources: {
      src: string;
      type: string;
    }[];
    poster: string;
  };
}

export const VideoJsPlayer = observer(({ options }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");
      videoRef.current.appendChild(videoElement);
      console.log(options);

      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          controls: true,
          fluid: true,
          responsive: true,
          autoplay: true,
          playbackRates: [0.5, 1, 1.5, 2],
          controlBar: {
            children: [
              "playToggle",
              "volumePanel",
              "currentTimeDisplay",
              "timeDivider",
              "durationDisplay",
              "progressControl",
              "remainingTimeDisplay",
              "playbackRateMenuButton",
              "pictureInPictureToggle",
              "fullscreenToggle",
            ],
          },
        },
        () => {
          videojs.log("player is ready");
        }
      ));

      player.on("ended", () => {
        if (store.autoplay) {
          store.playNextVideo();
        }
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options]);

  return (
    <div
      ref={videoRef}
      data-vjs-player
      className="vjs-custom-theme w-full h-auto"
    />
  );
});
