import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "@/contexts/AudioContext";

const inductionPhotos = [
  "images/Induction/EngTJ_1.jpg",
  "images/Induction/EngTJ_3.jpg",
  "images/Induction/EngTJ_2.jpg",
];

const Induction = () => {
  const navigate = useNavigate();
  const audioContext = useAudio();
  const setIsInductionMode = audioContext?.setIsInductionMode;
  const setCurrentZone = audioContext?.setCurrentZone;

  // 1. MODE SWITCHING LOGIC
  useEffect(() => {
    if (setIsInductionMode) {
        // A. Enter Induction Mode (Plays Induction Song)
        setIsInductionMode(true);
        
        // B. Cleanup: When leaving this page...
        return () => {
            setIsInductionMode(false); // Stop Induction Song
        };
    }
  }, [setIsInductionMode]);

  // 2. HANDLE BACK BUTTON
  const handleBack = () => {
      // A. Scroll to top immediately
      window.scrollTo(0, 0); 
      
      // B. Force Audio Zone to 0 (Song 1)
      if (setCurrentZone) setCurrentZone(0);

      // C. Navigate Home
      navigate("/");
  };

  return (
    <section className="min-h-screen bg-black text-white py-12 px-6 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-yellow-900/20 to-transparent pointer-events-none" />

      {/* Navigation Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto flex items-center justify-between mb-12 relative z-10"
      >
        <button 
          onClick={handleBack} 
          className="flex items-center gap-3 text-white/60 hover:text-white transition-all group"
        >
          <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-lg font-medium tracking-wide">Return to Timeline</span>
        </button>
      </motion.div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center p-6 rounded-full bg-yellow-500/10 mb-8 border border-yellow-500/30 shadow-[0_0_30px_-5px_rgba(234,179,8,0.3)]"
          >
            <Award className="w-16 h-16 text-yellow-400" />
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-thin tracking-tight mb-6">
            Induction <span className="text-yellow-400 font-bold drop-shadow-2xl">Pictures</span>
          </h1>
          
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8 opacity-50" />

          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
            Officially inducted into the <span className="text-white font-semibold">Nigerian Society of Engineers</span>. 
            <br className="hidden md:block" />
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {inductionPhotos.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group shadow-2xl border border-white/10 bg-white/5"
            >
              <img 
                src={src} 
                alt={`Induction Moment ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center mt-32 pb-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-yellow-400/90 mb-4">
             <Check className="w-5 h-5" />
             <span className="text-sm font-bold tracking-widest uppercase">Clock it! 🤏</span>
          </div>
          <p className="text-3xl md:text-5xl font-light italic text-white/90 font-serif">
            "TIJANI, SAHEED OLUWASEGUN (GMNSE) "
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Induction;