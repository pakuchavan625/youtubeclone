import { useEffect, useState, useRef } from "react";
import { formatDuration, formatViews } from "../utils/fomateDuration";

type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VideoGridItem = ({id, title,channel, views, postedAt,duration,thumbnailUrl,videoUrl}: VideoGridItemProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current === null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          alt=""
          className={`block w-full h-full object-cover rounded-xl ${
            isVideoPlaying ? "rounded-none" : "rounded-xl"
          }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-white text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnailUrl}
          muted
          playsInline
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
            isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
          }`}
        />
      </a>
      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img className="w-12 h-12 rounded-full" src={channel.profileUrl} />
        </a>
        <div>
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
            {channel.name}
          </a>
          <div className="text-xs text-gray-500 flex gap-1">
            <span>{formatViews(views)} views</span>
            <span>{postedAt.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGridItem;
