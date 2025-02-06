import { Camera } from "lucide-react";
import { store } from "../../stores/VideoStore";

export const CameraButton = () => {
  const handleCameraClick = () => {
    store.toggleWebcam();
  };
  return (
    <button onClick={handleCameraClick} className="bg-button">
      <Camera className="w-6 h-6" />
    </button>
  );
};
