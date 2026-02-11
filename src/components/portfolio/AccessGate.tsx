import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AccessGateProps {
  onUnlock: () => void;
}

const VALID_NICKNAMES = [
  "sirheed",
  "tjsirheed",
  "pacioli",
  "paciolo",
  "sirmonk",
  "seadorf",
  "0xheed",
  "explorer",
];

const AccessGate = ({ onUnlock }: AccessGateProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const normalizedInput = password.trim().toLowerCase();
    
    if (VALID_NICKNAMES.includes(normalizedInput)) {
      setError(false);
      setIsUnlocking(true);
      setTimeout(() => {
        onUnlock();
      }, 800);
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <AnimatePresence>
      {!isUnlocking ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Background Image Placeholder */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('images/newone.jpg')`,
            }}
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Center Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 w-full max-w-md px-6"
          >
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
              {/* Lock Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
              >
                <Lock className="w-10 h-10 text-white/80" />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-light text-white text-center tracking-tight"
              >
                Do you really know me?
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/60 text-center text-sm"
              >
                Only the real ones get in. 🔐
              </motion.p>

              {/* Input Field */}
              <motion.div
                animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <Input
                  type="text"
                  placeholder="Enter one of my nicknames..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className="w-full h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/40 text-center text-lg focus:border-primary focus:ring-primary"
                />
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm font-medium"
                  >
                    Hmm, try again fam. 🤔
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg gap-2"
              >
                <Unlock className="w-5 h-5" />
                Let's find out
              </Button>

              {/* Hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/40 text-xs text-center"
              >
                Hint: Think about what people call me online... 💭
              </motion.p>
            </form>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-2xl font-light"
          >
            You're welcome 🎉
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccessGate;
