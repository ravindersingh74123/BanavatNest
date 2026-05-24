"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";

const AboutUs = () => {
  const t = useTranslations("aboutUsPage");
  const tName = useTranslations("aboutName");
  const tMission = useTranslations("aboutMission");

  const heroImages = ["/images/BANAVAT.png", "/images/NEST.png"];

  return (
    <main className="min-h-screen pt-20 relative overflow-hidden">
      {/* Dotted Background (Consistent with other premium pages) */}
      <div
        className="absolute inset-0 pointer-events-none 
                bg-[radial-gradient(circle,_rgba(0,0,0,0.06)_1px,_transparent_1px)] 
                dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.06)_1px,_transparent_1px)]
                [background-size:24px_24px] -z-10"
      />

      {/* Hero Section */}
      {/* <section className="relative w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900/50">
                <div className="w-full relative">
                    <ImageCarousel
                        images={heroImages}
                        aspectRatio="aspect-[1500/800] md:aspect-[1500/625]"
                        rounded="rounded-none"
                        objectFit="contain"
                    />
                </div>
                <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.07, 0.14, 0.07] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="hidden dark:block absolute z-10 top-[15%] right-[22%] w-[300px] h-[300px] md:w-[560px] md:h-[560px] rounded-full bg-[#3A9B9B]/10 blur-[80px] md:blur-[160px] pointer-events-none"
                />
            </section> 
            
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 md:mt-8 pb-4 text-center text-zinc-600 dark:text-zinc-400 w-full mx-auto px-4 text-sm md:text-base lg:text-xl font-medium tracking-wide"
            >
                {t('subtitle')}
            </motion.div>*/}

      {/* Our Name Section */}
      <section className="px-6 py-10 md:p-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl dark:text-white lg:text-6xl font-bold mb-4"
          >
            {t("whyTheName")}{" "}
            <span className="text-[#3A9B9B]">{t("whyTheNameHighlight")}</span>
          </motion.h2>
        </div>

        <div className="mt-12">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5 }}
              className="relative p-8 md:p-12 rounded-[2.5rem] overflow-hidden 
                                border-2 border-[#3A9B9B]/20 
                                bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 
                                dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 
                                backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
              <h4 className="text-4xl font-black text-[#2D3561]  mb-8 tracking-tight  ">
                {tName("banavatTitle")}
              </h4>
              <p className="text-xl text-gray-600 dark:text-zinc-300 leading-relaxed font-medium text-justify">
                {tName("banavatDesc")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5 }}
              className="relative p-8 md:p-12 rounded-[2.5rem] overflow-hidden 
                                border-2 border-[#3A9B9B]/20 
                                bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 
                                dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 
                                backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
              <h4 className="text-4xl font-black text-[#3A9B9B] mb-8 tracking-tight">
                {tName("nestTitle")}
              </h4>
              <p className="text-xl text-gray-600 dark:text-zinc-300 leading-relaxed font-medium text-justify">
                {tName("nestDesc")}
              </p>
            </motion.div>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 w-full max-w-7xl mx-auto text-2xl pt-10">
            {tName("quote")}
          </p>
        </div>
      </section>

      {/* Symbolism of BanavatNest Section */}
      <section className="px-6 py-10 md:p-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl dark:text-white lg:text-6xl font-bold mb-4"
          >
            {t.rich("symbolismLabel", {
              brand: (chunks) => (
                <span className="text-[#3A9B9B]">{chunks}</span>
              ),
            })}
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] overflow-hidden
                        border-2 border-[#3A9B9B]/20
                        bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5
                        dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10
                        backdrop-blur-sm shadow-lg"
        >
          {/* Decorative accent line */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-0 items-start pt-5">
            {/* LEFT: Heading + Content */}
            <div className="px-6 md:px-10 !pt-[30px] py-10 md:py-16">
              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-2xl text-justify md:text-4xl lg:text-5xl font-black tracking-tight
                                    bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]
                                    dark:from-white dark:via-[#3A9B9B] dark:to-white
                                    bg-clip-text text-transparent mb-4"
              >
                {tName("sloganText")}
              </motion.h2>

              {/* Divider */}
              <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" />

              {/* Philosophy text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-zinc-600 md:text-2xl text-justify dark:text-zinc-400 text-base leading-relaxed"
              >
                {tName("closingStatement")}
              </motion.p>
            </div>

            {/* RIGHT: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1.1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative aspect-square"
            >
              <Image
                src="/images/Idea-Deploy.png"
                alt="Idea to Deployment"
                fill
                className="object-contain transition-transform duration-700 hover:scale-105 p-6 md:p-8"
              />
            </motion.div>
          </div>

          {/* Decorative bottom glow */}
          <div className="absolute bottom-0 left-1/4 -translate-x-1/2 w-48 h-24 bg-[#3A9B9B]/15 blur-3xl rounded-full pointer-events-none" />
        </motion.div>
      </section>

      <section className="px-6 py-10 md:p-12 relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl dark:text-white font-bold mb-4"
          >
            {t("coreValuesTitle")}{" "}
            <span className="text-[#3A9B9B]">{t("coreValuesHighlight")}</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] overflow-hidden
                        border-2 border-[#3A9B9B]/20
                        bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5
                        dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10
                        backdrop-blur-sm shadow-lg"
        >
          {/* Decorative accent line */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />

          <div className="grid md:grid-cols-2 gap-0 items-start pt-5">
            {/* LEFT: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: -20 }}
              whileInView={{ opacity: 1, scale: 1.1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative aspect-square"
            >
              <Image
                src="/images/Core Values.png"
                alt="Idea to Deployment - Core Values"
                fill
                className="object-contain transition-transform duration-700 hover:scale-105 p-6 md:p-8"
              />
            </motion.div>

            {/* RIGHT: Text + Grid */}
            <div className="px-6 md:px-10 !pt-[30px] py-10 md:py-16">
              {/* Philosophy text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-zinc-600 md:text-2xl text-justify dark:text-zinc-400 text-base leading-relaxed mb-12"
              >
                {t.rich("coreValuesIntro", {
                  brand: (chunks) => (
                    <span className="text-[#3A9B9B]">{chunks}</span>
                  ),
                })}
              </motion.p>

              {/* Divider */}
              {/* <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" /> */}
              <br />
              {/* Values — 2×2 card grid */}
              <div className="grid grid-cols-2 gap-5">
                {[
                  {
                    num: "01",
                    title: t("purposeTitle"),
                    desc: t("purposeDesc"),
                  },
                  {
                    num: "02",
                    title: t("processTitle"),
                    desc: t("processDesc"),
                  },
                  {
                    num: "03",
                    title: t("prototypeTitle"),
                    desc: t("prototypeDesc"),
                  },
                  {
                    num: "04",
                    title: t("progressTitle"),
                    desc: t("progressDesc"),
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    whileHover={{
                      y: -4,
                      boxShadow: "0 20px 40px -12px rgba(58,155,155,0.2)",
                    }}
                    className="relative flex flex-col justify-between p-5 rounded-2xl overflow-hidden
                                            border-2 border-[#3A9B9B]/20 
                                            bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 
                                            dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 
                                            backdrop-blur-sm shadow-sm
                                            transition-all duration-300 cursor-default"
                  >
                    {/* Accent line */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />

                    {/* Number badge */}
                    <span className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                      {item.num}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-lg md:text-xl font-black tracking-tight leading-tight mb-2
                                                bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] bg-clip-text text-transparent
                                                dark:from-white dark:to-[#3A9B9B]"
                    >
                      {item.title}
                    </h3>

                    {/* Divider */}
                    <div
                      className="w-8 h-[1.5px] rounded-full mb-2"
                      style={{
                        background: index % 2 === 0 ? "#3A9B9B" : "#2D3561",
                      }}
                    />

                    {/* Description */}
                    <p className="text-zinc-500 dark:text-zinc-400 text-[11px] md:text-[13px] font-medium leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative bottom glow */}
          <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-48 h-24 bg-[#3A9B9B]/15 blur-3xl rounded-full pointer-events-none" />
        </motion.div>
      </section>
      {/* Our Mission & Our Vision Section */}
      <section className="px-6 py-10 md:p-12 max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl dark:text-white font-bold mb-4"
          >
            <span className="text-[#2D3561] "> {tMission("missionTitle")}</span>{" "}
            &amp;{" "}
            <span className="text-[#3A9B9B] "> {tMission("visionTitle")}</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="relative p-8 md:p-12 rounded-[2.5rem] overflow-hidden 
                                border-2 border-[#3A9B9B]/20 
                                bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 
                                dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 
                                backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
            <h2 className="text-4xl font-black text-[#2D3561] mb-8 tracking-tight">
              {tMission("missionTitle")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-zinc-300 leading-relaxed font-medium text-justify">
              {tMission("missionText")}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="relative p-8 md:p-12 rounded-[2.5rem] overflow-hidden 
                                border-2 border-[#3A9B9B]/20 
                                bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 
                                dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 
                                backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
            <h2 className="text-4xl font-black text-[#3A9B9B] mb-8 tracking-tight">
              {tMission("visionTitle")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-zinc-300 leading-relaxed font-medium text-justify">
              {tMission("visionText")}
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
