import "./styles/videoPlayer.css";
import { observer } from "mobx-react-lite";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import { store } from "../../stores/VideoStore";
import { VideoJsPlayer } from "./ui/VideoPlayer";

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
