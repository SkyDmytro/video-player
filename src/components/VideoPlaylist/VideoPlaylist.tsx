import { observer } from "mobx-react-lite";
import { store } from "../../stores/VideoStore";

export const VideoPlaylist = observer(() => {
  return (
    <div className="bg-secondaryBackgroundColor text-text rounded-lg p-4">
      <h3 className="font-semibold mb-4">Playlist</h3>
      <div className="space-y-2">
        {store.videos.map((video) => (
          <div
            key={video.id}
            className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer ${
              video.id === store.currentVideoId
                ? "bg-primary/10"
                : "hover:bg-muted-foreground/10"
            }`}
            onClick={() => {
              console.log("1");
              store.setCurrentVideo(video.id);
            }}
          >
            <img
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              className="w-40 h-[90px] object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium">{video.title}</h4>
            </div>
            <button
              className="bg-button hover:bg-button-hover text-text px-4 py-2 rounded"
              onClick={(e) => {
                e.stopPropagation();
                store.removeVideo(video.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});
