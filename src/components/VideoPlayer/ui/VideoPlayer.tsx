import { useEffect, useRef } from "react";
import videojs from "video.js";
interface VideoPlayerProps {
  options: any;
  onReady: (player: Player) => void;
}
export const VideoJsPlayer = ({ options, onReady }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          controls: true,
          fluid: true,
          responsive: true,
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
          // onReady(player);
        }
      ));

      player.on("play", () => console.log("video play"));
      player.on("pause", () => console.log("video pause"));
      player.on("ended", () => console.log("video ended"));
    } else if (playerRef.current) {
      playerRef.current.src(options.sources);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options, onReady]);

  return (
    <div
      ref={videoRef}
      data-vjs-player
      className="vjs-custom-theme w-full h-auto"
    />
  );
};
