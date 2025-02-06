import "./styles/videoPlayer.css";
import "video.js/dist/video-js.css";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { store } from "../../stores/VideoStore";
import { VideoJsPlayer } from "./ui/VideoPlayer";
import { WebCamComponent } from "./ui/WebCamComponent";
import { getWebcam } from "../../helpers/utils";

export const VideoPlayer = observer(() => {
  const { currentVideo, isWebcam } = store;

  useEffect(() => {
    if (isWebcam) {
      (async () => {
        const video = document.querySelector("#webcam") as HTMLVideoElement;
        const stream = await getWebcam();
        video.srcObject = stream;
      })();
    }
  }, [isWebcam]);

  if (isWebcam) return <WebCamComponent />;

  if (!currentVideo) return <div>No video selected</div>;

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    sources: [{ src: currentVideo.url, type: "video/mp4" }],
    poster: currentVideo.thumbnail || "",
  };

  return <VideoJsPlayer options={videoJsOptions} />;
});
