import { Star, Trash } from "lucide-react";
import { store } from "../../../stores/VideoStore";

export const VideoItem = ({
  video,
  onSetCurrentVideo,
  onOpenReviewModal,
  onRemoveVideo,
  isCurrentVideo,
}: {
  video: (typeof store.videos)[number];
  onSetCurrentVideo: () => void;
  onOpenReviewModal: () => void;
  onRemoveVideo: () => void;
  isCurrentVideo: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer ${
        isCurrentVideo
          ? "bg-backgroundColor text-text"
          : "hover:bg-backgroundColor"
      }`}
      onClick={onSetCurrentVideo}
    >
      <img
        src={video.thumbnail || "/placeholder.svg"}
        alt={video.title}
        className="w-40 h-[90px] object-cover rounded"
      />
      <div className="flex-1">
        <h4 className="font-medium text-left">{video.title}</h4>
        <div className="flex items-center gap-1 mt-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={`h-3 w-3 ${
                value <= video.averageRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({video.reviews.length})
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-button hover:bg-button-hover text-text px-4 py-2 rounded"
          onClick={onOpenReviewModal}
        >
          <Star className="h-4 w-4" />
        </button>
        <button
          className="bg-button hover:bg-button-hover text-text px-4 py-2 rounded"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveVideo();
          }}
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
