import { useState } from "react";
import { store } from "../../../stores/VideoStore";
import { validateVideoUrl } from "../../../helpers/utils";

export const AddNewVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const { addVideo } = store;

  const handleAddVideo = () => {
    if (videoUrl.trim() === "" || !validateVideoUrl(videoUrl)) {
      setErrors(["Please enter a valid video URL"]);
      return;
    }
    addVideo({
      title: "New Video",
      url: videoUrl,
      thumbnail:
        "https://buffer.com/resources/content/images/resources/wp-content/uploads/2017/02/video-stats@2x.png",
    });
    setVideoUrl("");
    setErrors([]);
  };

  return (
    <div className="flex items-center gap-2 flex-col flex-1">
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="px-2 py-1 border-2 border-gray-300 border-solid border-button rounded-md w-full bg-backgroundColor text-text"
        placeholder="Add new video"
      />
      <button
        onClick={handleAddVideo}
        className="bg-button hover:bg-buttonHover text-white font-bold py-1 px-2 rounded w-full"
      >
        Add
      </button>
      {errors.length > 0 && <span className="text-red-500">{errors[0]}</span>}
    </div>
  );
};
