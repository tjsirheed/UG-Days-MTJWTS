import { useState, useRef } from "react";
import { Play } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

interface CustomVideoPlayerProps {
  src: string;
  className?: string;
}

const CustomVideoPlayer = ({ src, className }: CustomVideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setIsVideoPlaying } = useAudio();

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setIsVideoPlaying(true);
    }
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    setIsVideoPlaying(false);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setIsVideoPlaying(false);
    if (videoRef.current) {
        videoRef.current.currentTime = 0; 
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover rounded-lg"
        controls={isPlaying}
        playsInline
        onPause={handleVideoPause}
        onEnded={handleVideoEnd}
        onPlay={() => {
            setIsPlaying(true);
            setIsVideoPlaying(true);
        }}
      />

      {/* CUSTOM CENTER PLAY BUTTON */}
      {!isPlaying && (
        <div 
          onClick={handlePlayClick}
          className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all cursor-pointer z-10"
        >

          <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Play className="w-5 h-5 md:w-6 md:h-6 text-white fill-white ml-0.5" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomVideoPlayer;