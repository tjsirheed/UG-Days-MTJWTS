import CustomVideoPlayer from "@/components/portfolio/CustomVideoPlayer";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowLeft, ArrowRight } from "lucide-react";

type CardType = "image" | "split" | "grid-3" | "grid-5" | "video";

interface StoryCard {
  type: CardType;
  heading: string;
  text: string;
  media: string | string[];
  wide?: boolean;
}

const cards: StoryCard[] = [
  {
    type: "image",
    heading: "400 Level Mehn!",
    text: "I took 8 courses with 4 practicals. \n What do you mean I have to write 4 reports in a week?",
    media: "images/level400/image1.jpg",
  },
  {
    type: "image",
    heading: "Zoological Garden",
    text: "This was my first time at the Zoo tho",
    media: "images/level400/zoo.jpg",
  },
  {
    type: "split",
    heading: "Last Skin? 😅",
    text: "That stage when you barb last skin? \n Yeah, that happened.",
    media: [
      "images/level400/shave1.jpg",
      "images/level400/shave2.jpg",
    ],
  },
  {
    type: "split",
    heading: "Still Fresh Sha",
    text: "Drip is eternal even with the shaved head",
    media: [
      "images/level400/shave3.jpg",
      "images/level400/shave4.jpg",
    ],
  },
  {
    type: "split",
    heading: "Power System 2",
    text: "Just finished the exam here. \n It was... breathtaking (and not in a good way).",
    media: [
      "images/level400/PS1.jpg",
      "images/level400/PS2.jpg",
    ],
  },
  {
    type: "image",
    heading: "Awba Dam",
    text: "Fun time at the dam. \n Her view tho.",
    media: "images/level400/awba.jpg",
  },
  {
    type: "image",
    heading: "TESA Conference",
    text: "Showed up again. \n Never missed one since 200 Level.",
    media: "images/level400/conf.jpg",
  },
  {
    type: "grid-3",
    heading: "IT at VAAV Innovative Solutions",
    text: "Evidence dey ooo",
    media: [
      "images/level400/IT1.jpg",
      "images/level400/IT3.jpg",
      "images/level400/IT4.jpeg",
    ],
    wide: true,
  },
  {
    type: "image",
    heading: "Final Year Loading ⏳",
    text: "Looking at final year... \n Vamos jooor!",
    media: "images/level400/finals.jpg",
  },
  {
    type: "split",
    heading: "For the record",
    text: "400 level IT Defense.",
    media: [
      "images/level400/defense4.jpg",
      "images/level400/defense3.jpg",
    ],
  },
];

const Level400 = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const renderMedia = (card: StoryCard) => {
    switch (card.type) {
      case "image":
        return (
          <motion.img
            src={card.media as string}
            alt={card.heading}
            className="w-full h-64 object-cover object-top rounded-xl"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />
        );
      case "split":
        return (
          <div className="flex gap-2 h-64">
            {(card.media as string[]).map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                alt={`${card.heading} ${idx + 1}`}
                className="w-1/2 h-full object-cover object-left rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        );
      case "grid-3":
        return (
          <div className="grid grid-cols-3 gap-2 h-64">
            {(card.media as string[]).map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                alt={`${card.heading} ${idx + 1}`}
                className="w-full h-full object-cover rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        );
      case "grid-5":
        return (
          <div className="grid grid-cols-3 grid-rows-2 gap-2 h-64">
            {(card.media as string[]).map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                alt={`${card.heading} ${idx + 1}`}
                className={`w-full h-full object-cover rounded-lg ${
                  idx === 3 ? "col-span-1" : ""
                } ${idx === 4 ? "col-span-1" : ""}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        );
      case "video":
        return (
          <div className="w-full h-64 rounded-xl overflow-hidden relative">
            <CustomVideoPlayer 
              src={card.media as string} 
              className="w-full h-full"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="level-400" className="py-12 px-6 lg:px-12 bg-level-400 relative">
      {/* Fixed Header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <span className="text-sm text-lg md:text-5xl font-bold text-primary drop-shadow-md tracking-wider uppercase">
          Fourth Year
        </span>

      </motion.div>

      {/* Horizontal Scroll Area */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-6 pb-6 snap-x snap-mandatory overflow-x-auto scrollbar-hide">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className={`${
                card.wide ? "min-w-[500px] max-w-[500px]" : "min-w-[350px] max-w-[350px]"
              } bg-card rounded-2xl shadow-lg border border-border overflow-hidden snap-center flex-shrink-0`}
            >
              {/* Media Section */}
              <div className="p-4">{renderMedia(card)}</div>

              {/* Text Section */}
              <div className="p-5 pt-2 whitespace-normal">
                <h3 className="font-semibold text-xl text-foreground mb-3">
                  {card.heading}
                </h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {card.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>

      {/* High Visibility Scroll Hint (Replaced Old Text) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-4 mt-10 pb-8"
      >
        {/* Left Arrow Animation */}
        <motion.div
          animate={{ x: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowLeft className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
        </motion.div>

        {/* The "Loud" Button */}
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
            <span className="relative flex items-center text-sm md:text-lg font-black text-black bg-yellow-400 px-8 py-3 rounded-full tracking-widest uppercase shadow-xl">
              SWIPE FOR MORE
            </span>
        </div>

        {/* Right Arrow Animation */}
        <motion.div
          animate={{ x: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Level400;