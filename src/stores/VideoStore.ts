import { types, type Instance } from "mobx-state-tree";

const Review = types.model("Review", {
  id: types.identifier,
  videoId: types.string,
  rating: types.number,
  comment: types.string,
  date: types.Date,
});

const VideoItem = types
  .model("VideoItem", {
    id: types.identifier,
    title: types.string,
    url: types.string,
    thumbnail: types.optional(types.string, ""),
    reviews: types.array(Review),
  })
  .views((self) => ({
    get averageRating() {
      if (self.reviews.length === 0) return 0;
      const sum = self.reviews.reduce((acc, review) => acc + review.rating, 0);
      return sum / self.reviews.length;
    },
  }));

const VideoStore = types
  .model("VideoStore", {
    videos: types.array(VideoItem),
    currentVideoId: types.maybe(types.string),
    isWebcam: types.optional(types.boolean, false),
    isRecording: types.optional(types.boolean, false),
    autoplay: types.optional(types.boolean, true),
    mediaRecorder: types.optional(types.frozen(), null),
    recordedChunks: types.optional(types.frozen(), []),
  })
  .actions((self) => ({
    setCurrentVideo(id: string) {
      self.currentVideoId = id;
      self.isWebcam = false;
    },
    addVideo(video: { title: string; url: string; thumbnail?: string }) {
      self.videos.push({
        id: Math.random().toString(36).substr(2, 9),
        reviews: [],
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
    playNextVideo() {
      if (!self.currentVideoId || !self.autoplay) return;
      const currentIndex = self.videos.findIndex(
        (v) => v.id === self.currentVideoId
      );
      if (currentIndex < self.videos.length - 1) {
        self.setCurrentVideo(self.videos[currentIndex + 1].id);
      }
    },

    addReview(videoId: string, rating: number, comment: string) {
      const video = self.videos.find((v) => v.id === videoId);
      if (video) {
        video.reviews.push({
          id: Math.random().toString(36).substr(2, 9),
          videoId,
          rating,
          comment,
          date: new Date(),
        });
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
      reviews: [
        {
          id: "1",
          videoId: "1",
          rating: 5,
          comment: "Great video!",
          date: new Date(),
        },
      ],
    },
    {
      id: "2",
      title: "Big Buck Bunny",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png",
      reviews: [],
    },
    {
      id: "4",
      title: "For Bigger Blazes",
      url: "https://vjs.zencdn.net/v/oceans.mp4",
      thumbnail: "https://vjs.zencdn.net/v/oceans.png",

      reviews: [],
    },
    {
      id: "3",
      title: "Sintel",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      thumbnail: "https://picfiles.alphacoders.com/124/124263.jpg",
      reviews: [],
    },
  ],
  currentVideoId: "1",
});

export type VideoStoreType = Instance<typeof VideoStore>;
