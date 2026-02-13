import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Layers, ArrowRight } from "lucide-react"; 
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CustomVideoPlayer from "@/components/portfolio/CustomVideoPlayer";
import { useNavigate } from "react-router-dom"; 

type MediaItem = {
  type: "image" | "video";
  src: string;
};

type GridItem = {
  id: number;
  type: "image" | "video" | "cluster" | "stat" | "album";
  text: string;
  media?: MediaItem[];
  albumImages?: string[];
  wide?: boolean;
};

const gridItems: GridItem[] = [
  {
    id: 1,
    type: "image",
    text: "500 level resumption is almost here ooo.",
    media: [{ type: "image", src: "images/level500/Resumption.jpg" }],
  },
  {
    id: 2,
    type: "video",
    text: "You dey find me for class ke? 😂",
    media: [{ type: "video", src: "videos/level500/class.mp4" }],
  },
  {
    id: 3,
    type: "cluster",
    text: "Attend parties ooo. We ball too.",
    media: [
      { type: "image", src: "images/level500/SOS.jpg" },
      { type: "image", src: "images/level500/SOS2.jpg" },
      { type: "video", src: "videos/level500/typeSOS.mp4" },
    ],
  },
  {
    id: 12,
    type: "video",
    text: "I chest one nice heartbreak along the line sha",
    media: [{ type: "video", src: "videos/level500/break1.mp4" }],
  },
  {
    id: 4,
    type: "cluster",
    text: "IEEE-IMS Workshop.",
    media: [
      { type: "image", src: "images/level500/image1.jpg" },
      { type: "image", src: "images/level500/image2.jpg" },
      { type: "video", src: "videos/level500/video1.mp4" },
    ],
  },
  {
    id: 5,
    type: "video",
    text: "I was very unserious in first semester oooo...",
    media: [{ type: "video", src: "videos/level500/unserious.mp4" }],
  },
  {
    id: 10,
    type: "image",
    text: "Showed up for SEEES week.",
    media: [{ type: "image", src: "images/level500/week.png" }],
  },
  {
    id: 8,
    type: "cluster",
    text: "Final CA as an Undergraduate.",
    media: [
      { type: "image", src: "images/level500/final1.jpg" },
      { type: "image", src: "images/level500/final2.jpg" },
    ],
  },
  {
    id: 7,
    type: "album",
    text: "FYB Week Highlights.",
    media: [{ type: "image", src: "images/level500/Day11.jpg" }],
    albumImages: [
      "images/level500/Day1.jpg",
      "images/level500/Day2.jpg",
      "images/level500/Day3.jpg",
      "images/level500/Day4.jpg",
      "images/level500/Day5.jpg",
    ],
  },
  {
    id: 9,
    type: "cluster",
    text: "Final exams next week? \n Still showed up for the best tech event in Ibadan.",
    media: [
      { type: "image", src: "images/level500/fest1.jpeg" },
      { type: "image", src: "images/level500/fest2.jpeg" },
    ],
  },
  {
    id: 18,
    type: "video",
    text: "Project Wahala?",
    media: [{ type: "video", src: "videos/level500/red.mp4" }],
  },
  {
    id: 19,
    type: "video",
    text: "Literature review?",
    media: [{ type: "video", src: "videos/level500/litrev.mp4" }],
  },
  {
    id: 20,
    type: "video",
    text: "My supervisor likes aesthetic, so I turned to a spray painter.",
    media: [{ type: "video", src: "videos/level500/nice1.mp4" }],
  },
  {
    id: 21,
    type: "image",
    text: "I was so tired at a point. \n Can't we just wrap up this degree",
    media: [
      { type: "image", src: "images/level500/tired2.jpg" },
    ],
  },
  {
    id: 22,
    type: "image",
    text: "Two days to defense and project is not working? \n 94 minutes defeat? Never!",
    media: [
      { type: "image", src: "images/level500/tired1.jpg" },
    ],
  },
  {
    id: 23,
    type: "album",
    text: "Internal Defense. 📁",
    media: [{ type: "image", src: "images/level500/real10.jpg" }],
    albumImages: [
      "images/level500/real1.jpg",
      "images/level500/real2.jpg",
      "images/level500/real3.jpg",
      "images/level500/real5.jpg",
      "images/level500/real6.jpg",
      "images/level500/real7.jpg",
      "images/level500/real8.jpg",
      "images/level500/real9.jpg",
    ],
  },
  {
    id: 24,
    type: "album",
    text: "External Defense. 🎓",
    media: [{ type: "image", src: "images/level500/new1.jpg" }],
    albumImages: [
      "images/level500/new2.jpg",
      "images/level500/new3.jpg",
      "images/level500/new4.jpg",
      "images/level500/new5.jpg",
      "images/level500/new6.jpg",
    ],
  },
  {
    id: 11,
    type: "cluster",
    text: "Final dinner as a SEEESite.",
    media: [
      { type: "image", src: "images/level500/dinner3.jpg" },
      { type: "image", src: "images/level500/dinner2.jpg" },
    ],
  },
  {
    id: 13,
    type: "cluster",
    text: "Sign out jooor (MTJWTS).",
    media: [
      { type: "image", src: "images/level500/sign1.jpg" },
      { type: "image", src: "images/level500/sign2.jpg" },
    ],
  },
  {
    id: 14,
    type: "cluster",
    text: "DONE! ✅",
    media: [
      { type: "image", src: "images/level500/Grad.webp" },
      { type: "image", src: "images/level500/finally.jpg" },
    ],
  },
  {
    id: 16,
    type: "image",
    text: "AVMS Dinner.",
    media: [{ type: "image", src: "images/level500/AVMS_Dinner.jpg" }],
  },
  {
    id: 17,
    type: "cluster",
    text: "Back on the pitch after a long time.",
    media: [
      { type: "image", src: "images/level500/ball1.jpg" },
      { type: "image", src: "images/level500/ball2.jpg" },
    ],
  },
  {
    id: 15,
    type: "video",
    text: "It's all by HIS grace.",
    media: [{ type: "video", src: "videos/level500/thanks.mp4" }],
  },
  {
    id: 29,
    type: "video",
    text: "I will leave with this. 👋 \n AlhamduliLlah!",
    media: [{ type: "video", src: "videos/level500/bye.mp4" }],
    wide: true,
  },
];

const Level500 = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<string[] | null>(null);
  const [albumIndex, setAlbumIndex] = useState(0);
  const navigate = useNavigate(); 

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleAlbumOpen = (images: string[]) => {
    setSelectedAlbum(images);
    setAlbumIndex(0);
  };

  const handleAlbumPrevious = () => {
    if (selectedAlbum) {
      setAlbumIndex(
        albumIndex === 0 ? selectedAlbum.length - 1 : albumIndex - 1
      );
    }
  };

  const handleAlbumNext = () => {
    if (selectedAlbum) {
      setAlbumIndex(
        albumIndex === selectedAlbum.length - 1 ? 0 : albumIndex + 1
      );
    }
  };

  const renderMedia = (item: GridItem) => {
    const textClasses = "text-white text-sm md:text-base font-medium whitespace-pre-line";

    if (item.type === "stat") {
      return (
        <div className="w-full h-full min-h-[200px] bg-yellow-500 flex items-center justify-center p-6">
          <p className="text-black text-xl md:text-2xl font-bold text-center leading-tight whitespace-pre-line">
            {item.text}
          </p>
        </div>
      );
    }

    if (item.type === "album" && item.media && item.albumImages) {
      return (
        <button
          onClick={() => handleAlbumOpen(item.albumImages!)}
          className="relative w-full h-full min-h-[250px] group cursor-pointer"
        >
          <div className="absolute inset-2 bg-white/20 rounded-lg transform rotate-3" />
          <div className="absolute inset-2 bg-white/30 rounded-lg transform -rotate-2" />
          <img
            src={item.media[0].src}
            alt={item.text}
            className="relative w-full h-full object-cover rounded-lg"
          />
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
            <Layers className="w-3 h-3" />+{item.albumImages.length - 1} More
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12 rounded-b-lg">
            <p className={textClasses}>{item.text}</p>
          </div>
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 rounded-lg" />
        </button>
      );
    }

    if (item.type === "image" && item.media) {
      return (
        <div className="relative w-full h-full min-h-[200px] group">
          <img
            src={item.media[0].src}
            alt={item.text}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12">
            <p className={textClasses}>{item.text}</p>
          </div>
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
        </div>
      );
    }

    if (item.type === "video" && item.media) {
      return (
        <div className="relative w-full h-full min-h-[250px] group">
          <CustomVideoPlayer
            src={item.media[0].src}
            className="w-full h-full"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12 pointer-events-none">
            <p className={textClasses}>{item.text}</p>
          </div>
        </div>
      );
    }

    if (item.type === "cluster" && item.media) {
      const hasVideo = item.media.some((m) => m.type === "video");
      const images = item.media.filter((m) => m.type === "image");
      const videos = item.media.filter((m) => m.type === "video");

      if (hasVideo && item.media.length === 3) {
        return (
          <div className="relative w-full h-full min-h-[300px] group">
            <div className="grid grid-cols-2 gap-1 h-full">
              <div className="flex flex-col gap-1">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.src}
                    alt=""
                    className="w-full h-1/2 object-cover"
                  />
                ))}
              </div>
              <div className="w-full h-full relative">
                <CustomVideoPlayer
                  src={videos[0].src}
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12 pointer-events-none">
              <p className={textClasses}>{item.text}</p>
            </div>
          </div>
        );
      }

      return (
        <div className="relative w-full h-full min-h-[200px] group">
          <div className="flex gap-1 h-full">
            {item.media.map((m, idx) => (
              <img
                key={idx}
                src={m.src}
                alt=""
                className="w-1/2 h-full object-cover"
              />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12">
            <p className={textClasses}>{item.text}</p>
          </div>
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
        </div>
      );
    }

    return null;
  };

  return (
    <section id="level-500" className="py-12 px-6 lg:px-12 bg-level-500">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-6 text-center">
          <span className="text-sm text-lg md:text-5xl font-bold text-primary drop-shadow-md tracking-wider uppercase">
            Fifth Year
          </span>
          <h2 className="text-3xl md:text-5xl font-light mt-2 text-foreground">
            500 Level - The Victory Lap
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            The final chapter. From resumption to graduation. Every moment
            mattered.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          variants={containerVariants}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {gridItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`break-inside-avoid overflow-hidden rounded-xl bg-card shadow-lg ${
                item.wide ? "sm:col-span-2 lg:col-span-3" : ""
              }`}
            >
              {renderMedia(item)}
            </motion.div>
          ))}
        </motion.div>

        {/* Album Lightbox */}
        <Dialog
          open={selectedAlbum !== null}
          onOpenChange={() => setSelectedAlbum(null)}
        >
          <DialogContent className="max-w-4xl p-0 bg-background/95 backdrop-blur-md border-border overflow-hidden">
            <AnimatePresence mode="wait">
              {selectedAlbum && (
                <motion.div
                  key={albumIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <img
                    src={selectedAlbum[albumIndex]}
                    alt={`Album photo ${albumIndex + 1}`}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                    <p className="text-sm text-muted-foreground">
                      Photo {albumIndex + 1} of {selectedAlbum.length}
                    </p>
                  </div>

                  <button
                    onClick={handleAlbumPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-background transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleAlbumNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-background transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="max-w-4xl mx-auto mt-24 text-center"
      >
        <p className="text-2xl md:text-3xl font-light text-foreground mb-4">
          "Arriesgar Nada, Ganar Nada"
        </p>
        <p className="text-muted-foreground mb-12">
          Risk nothing, gain nothing. Thank you for being part of my journey.
        </p>

        <div className="flex justify-center pb-20">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/induction");
            }}
            className="group relative flex items-center gap-4 bg-gradient-to-r from-yellow-500 to-amber-600 px-8 py-5 rounded-full shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-105"
          >
            <div className="text-left">
              <p className="text-black/60 text-xs font-bold uppercase tracking-widest mb-0.5">
                The Next Chapter
              </p>
              <p className="text-black text-xl font-black uppercase tracking-wide">
                View Induction
              </p>
            </div>
            <div className="bg-black/20 p-2 rounded-full group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-6 h-6 text-black" />
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Level500;