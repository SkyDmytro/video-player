import { observer } from "mobx-react-lite";
import { store } from "../../stores/VideoStore";
import { AddReviewModal } from "../AddReviewModal/AddReviewModalController";
import { useDialog } from "../../hooks/useDialog";
import { useState } from "react";
import { VideoItem } from "./ui/VideoItem";

export const VideoPlaylist = observer(() => {
  const { setCurrentVideo, removeVideo } = store;
  const { closeDialog, isOpen, openDialog } = useDialog();
  const [videoToReview, setVideoToReview] = useState("");

  const handleSetCurrentVideo = (videoId: string) => () =>
    setCurrentVideo(videoId);
  const handleOpenReviewModal = (videoId: string) => () => {
    setVideoToReview(videoId);
    openDialog();
  };

  return (
    <div className="bg-secondaryBackgroundColor text-text rounded-lg p-4">
      <AddReviewModal
        closeDialog={closeDialog}
        isOpen={isOpen}
        videoId={videoToReview}
      />
      <h3 className="font-semibold mb-4">Playlist</h3>
      <div className="space-y-2">
        {store.videos.map((video) => (
          <VideoItem
            isCurrentVideo={video.id === store.currentVideoId}
            key={video.id}
            video={video}
            onSetCurrentVideo={handleSetCurrentVideo(video.id)}
            onOpenReviewModal={handleOpenReviewModal(video.id)}
            onRemoveVideo={() => removeVideo(video.id)}
          />
        ))}
      </div>
    </div>
  );
});
