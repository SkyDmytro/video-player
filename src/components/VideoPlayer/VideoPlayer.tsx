import "./styles/videoPlayer.css";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import { store } from "../../stores/VideoStore";

// Типи для пропсів
interface VideoPlayerProps {
  options: any;
  onReady?: (player: Player) => void;
}

export const VideoJsPlayer = ({ options, onReady }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    // Переконуємося, що Video.js player створюється тільки один раз
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current?.appendChild(videoElement);

      // Ініціалізуємо Video.js
      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          // Додаткові налаштування за замовчуванням
          controls: true, // Показувати елементи управління
          fluid: true, // Адаптивний розмір
          responsive: true,
          playbackRates: [0.5, 1, 1.5, 2], // Швидкості відтворення
          controlBar: {
            children: [
              "playToggle", // Кнопка play/pause
              "volumePanel", // Регулятор гучності
              "currentTimeDisplay", // Поточний час
              "timeDivider",
              "durationDisplay", // Загальна тривалість
              "progressControl", // Прогрес-бар
              "remainingTimeDisplay", // Час, що залишився
              "playbackRateMenuButton", // Меню швидкості відтворення
              "pictureInPictureToggle", // Картинка в картинці
              "fullscreenToggle", // Повноекранний режим
            ],
          },
        },
        () => {
          // Callback коли плеєр готовий
          videojs.log("player is ready");
          onReady && onReady(player);
        }
      ));

      // Додаємо обробники подій
      player.on("play", () => {
        console.log("video play");
      });

      player.on("pause", () => {
        console.log("video pause");
      });

      player.on("ended", () => {
        console.log("video ended");
      });
    }

    // Очищення при розмонтуванні
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options, onReady]);

  return (
    <div data-vjs-player>
      <video src="https://vjs.zencdn.net/v/oceans.mp4" className="video-js" />
    </div>
  );
};

export const VideoPlayer = observer(() => {
  const { currentVideo } = store;
  const videoJsOptions = {
    sources: [
      {
        src: currentVideo.url || "",
        type: "video/mp4",
      },
    ],
    poster: currentVideo?.thumbnail,
  };

  const handlePlayerReady = (player: Player) => {
    // Можна додати додаткову логіку при готовності плеєра
    console.log("player is ready", player);
  };

  return <VideoJsPlayer options={videoJsOptions} onReady={handlePlayerReady} />;
});
