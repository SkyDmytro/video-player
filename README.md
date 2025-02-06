# Video Player with React, Video.js, and MobX-state-tree

This project is a video player built with React, Video.js, and MobX-state-tree. The application allows users to:

* Play videos from a list of 3-5 sources (both remote videos and webcam).
* Control playback (pause, volume, fullscreen ).
* Manage a video playlist with MobX-state-tree (add, remove).
* Automatically switch to the next video in the playlist.
* Implement a rating and feedback system for each video.

## Features

### Video Playback

* Play videos from different sources (remote URLs Mp4).
* Play video from webcam (excluding the webcam recording functionality).

### Playback Controls

* Pause/Play.
* Volume control.
* Fullscreen mode toggle.

### Playlist Management

* Add, remove videos in the playlist using MobX-state-tree.
* Automatically play the next video in the list once the current one finishes.

### Rating System

* Users can rate videos and leave feedback, which is saved in the store.

## Technologies Used

* React: JavaScript library for building user interfaces.
* Video.js: Popular video player for embedding video content.
* MobX-state-tree: State management library for handling the application state.
* HTML5 Video API: For handling video-related functionality.

## How to Run the Project

### Clone the repository:

`git clone https://github.com/SkyDmytro/video-player.git`

### Navigate to the project directory:

  
  

`cd video-player`

  

### Install dependencies:

  

`npm install`

### Start the development server:

`npm run dev`

Open http://localhost:5173/ in your browser.
