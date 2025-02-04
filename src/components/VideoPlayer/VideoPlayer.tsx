import "./styles/videoPlayer.css";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import { store } from "../../stores/VideoStore";

interface VideoPlayerProps {
  options: any;
  onReady?: (player: Player) => void;
}

const VideoJsPlayer = ({ options, onReady }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add(
        "video-js",
        "vjs-big-play-centered",
        "vjs-theme-city"
      );
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
          onReady && onReady(player);
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

export const VideoPlayer = observer(() => {
  const { currentVideo } = store;

  const videoJsOptions = {
    sources: currentVideo
      ? [
          {
            src: currentVideo.url,
            type: "video/mp4",
          },
        ]
      : [],
    poster: currentVideo?.thumbnail || "",
  };

  const handlePlayerReady = (player: Player) => {
    console.log("player is ready", player);
  };

  if (!currentVideo) {
    return <div>No video selected</div>;
  }

  return <VideoJsPlayer options={videoJsOptions} onReady={handlePlayerReady} />;
});
