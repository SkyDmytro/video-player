import { types, type Instance } from "mobx-state-tree";

const VideoItem = types.model("VideoItem", {
  id: types.identifier,
  title: types.string,
  url: types.string,
  thumbnail: types.optional(types.string, ""),
});

const VideoStore = types
  .model("VideoStore", {
    videos: types.array(VideoItem),
    currentVideoId: types.maybe(types.string),
    isWebcam: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setCurrentVideo(id: string) {
      self.currentVideoId = id;
      self.isWebcam = false;
    },
    addVideo(video: { title: string; url: string; thumbnail?: string }) {
      self.videos.push({
        id: Math.random().toString(36).substr(2, 9),
        ...video,
      });
    },
    removeVideo(id: string) {
      const index = self.videos.findIndex((v) => v.id === id);
      if (index > -1) {
        self.videos.splice(index, 1);
      }
    },
    toggleWebcam() {
      self.isWebcam = !self.isWebcam;
      if (self.isWebcam) {
        self.currentVideoId = undefined;
      }
    },
  }))
  .views((self) => ({
    get currentVideo() {
      return self.videos.find((v) => v.id === self.currentVideoId);
    },
  }));

export const store = VideoStore.create({
  videos: [
    {
      id: "1",
      title: "Elephant Dream",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://i.ytimg.com/vi/w35vIqSvqI4/maxresdefault.jpg",
    },
    {
      id: "2",
      title: "For Bigger Blazes",
      url: "https://vjs.zencdn.net/v/oceans.mp4",
      thumbnail: "https://vjs.zencdn.net/v/oceans.png",
    },
    {
      id: "4",
      title: "Big Buck Bunny",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png",
    },
    {
      id: "3",
      title: "Sintel",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      thumbnail: "https://picfiles.alphacoders.com/124/124263.jpg",
    },
  ],
  currentVideoId: "1",
});

export type VideoStoreType = Instance<typeof VideoStore>;
