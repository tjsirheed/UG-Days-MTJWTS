import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode } from "react";

interface AudioContextType {
  isVideoPlaying: boolean;
  setIsVideoPlaying: (playing: boolean) => void;
  isMuted: boolean;
  toggleMute: () => void;
  isInductionMode: boolean;
  setIsInductionMode: (active: boolean) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);


const MAIN_TRACK = "/song_1.mp3";       // Plays on the Main Page
const INDUCTION_TRACK = "/song_4.mp3";  // Plays on Induction Page

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isInductionMode, setIsInductionMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. INITIALIZE
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(MAIN_TRACK);
      audioRef.current.volume = 0; 
      audioRef.current.loop = true; 
    }
    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  // 2. INTERACTION UNLOCK
  useEffect(() => {
    if (hasInteracted) return;
    const handleInteraction = () => {
      if (audioRef.current && !isMuted && audioRef.current.paused) {
        setHasInteracted(true);
        audioRef.current.play().catch(() => {});
      }
    };
    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [hasInteracted, isMuted]);

  // 3. MASTER SWITCHING LOGIC (Simple A/B Switch)
  useEffect(() => {
    if (!audioRef.current || !hasInteracted) return;

    // DECIDE WHICH SONG TO PLAY
    const targetSrc = isInductionMode ? INDUCTION_TRACK : MAIN_TRACK;

    // CHECK: Is it different from what is playing?
    if (!audioRef.current.src.endsWith(targetSrc)) {
      
      // A. FADE OUT
      const fadeOut = () => {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        
        fadeIntervalRef.current = setInterval(() => {
          if (audioRef.current && audioRef.current.volume > 0.05) {
            audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.05);
          } else {
            // B. STOP & SWITCH
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            
            if (audioRef.current) {
              audioRef.current.src = targetSrc;
              audioRef.current.loop = true; 
              audioRef.current.volume = 0; 
              audioRef.current.currentTime = 0; // ALWAYS START FRESH
              
              if (!isMuted && !isVideoPlaying) {
                audioRef.current.play().catch(() => {});
              }
              fadeIn(); 
            }
          }
        }, 50); 
      };

      // C. FADE IN
      const fadeIn = () => {
        fadeIntervalRef.current = setInterval(() => {
          if (audioRef.current && audioRef.current.volume < 0.3) {
            audioRef.current.volume = Math.min(0.3, audioRef.current.volume + 0.05);
          } else {
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          }
        }, 50);
      };

      fadeOut();
    }
  }, [isInductionMode, hasInteracted, isMuted, isVideoPlaying]);


  // 4. VIDEO DUCKING (Lower volume when video plays)
  useEffect(() => {
    if (!audioRef.current || !hasInteracted) return;

    if (isVideoPlaying) {
      const fadeOut = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.02) {
          audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.02);
        } else {
          clearInterval(fadeOut);
          audioRef.current?.pause();
        }
      }, 30);
    } else if (!isMuted) {
      audioRef.current.play().catch(() => {});
      const fadeIn = setInterval(() => {
        if (audioRef.current && audioRef.current.volume < 0.3) {
          audioRef.current.volume = Math.min(0.3, audioRef.current.volume + 0.02);
        } else {
          clearInterval(fadeIn);
        }
      }, 30);
    }
  }, [isVideoPlaying, hasInteracted, isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (audioRef.current) {
        if (newMuted) {
          audioRef.current.pause();
        } else if (hasInteracted && !isVideoPlaying) {
          audioRef.current.play().catch(() => {});
        }
      }
      return newMuted;
    });
  }, [hasInteracted, isVideoPlaying]);

  return (
    <AudioContext.Provider
      value={{
        isVideoPlaying,
        setIsVideoPlaying,
        isMuted,
        toggleMute,
        isInductionMode,
        setIsInductionMode
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within an AudioProvider");
  return context;
};