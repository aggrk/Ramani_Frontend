import { Link } from "react-router-dom";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const section = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 18,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 16,
    },
  },
};

export default function Home() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex w-full flex-col"
    >
      <motion.section
        variants={section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full px-4 py-8 sm:py-12 lg:py-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
            <motion.div
              variants={container}
              className="flex flex-col items-center space-y-4 text-center sm:space-y-6"
            >
              <motion.h1
                variants={item}
                className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl"
              >
                <span className="block text-textcolor sm:inline">
                  Get a Job Instantly
                </span>
                <span className="mx-2 hidden text-neutral sm:inline lg:mx-3">
                  -
                </span>
                <span className="mt-2 block text-textcolor sm:mt-0 sm:inline">
                  Order Construction Materials
                </span>
                <span className="mx-2 hidden text-neutral sm:inline lg:mx-3">
                  -
                </span>
                <span className="mt-2 block text-textcolor sm:mt-0 sm:inline">
                  Attract Customers Now
                </span>
              </motion.h1>

              <motion.p
                variants={item}
                className="mx-auto text-base text-textcolor sm:max-w-4xl sm:text-lg"
              >
                Ramani connects you with trusted hardware suppliers and
                construction professionals across Tanzania. Whether you're
                looking for a job in construction, searching for materials, an
                engineer needing handymen, or a supplier wanting to promote your
                business — this is where you belong.
              </motion.p>

              <motion.div
                variants={item}
                className="flex w-full flex-col flex-wrap justify-center gap-3 pt-4 sm:flex-row sm:gap-4"
              >
                <Link
                  to=""
                  className="w-full rounded-lg border-2 border-textcolor px-4 py-3 text-center font-semibold text-textcolor shadow-sm transition-all duration-300 hover:border-none hover:bg-textsecondary hover:text-bgcolor sm:w-auto sm:px-6"
                >
                  Find a job
                </Link>
                <Link
                  to=""
                  className="w-full rounded-lg border-2 border-textcolor px-4 py-3 text-center font-semibold text-textcolor shadow-sm transition-all duration-300 hover:border-none hover:bg-textsecondary hover:text-bgcolor sm:w-auto sm:px-6"
                >
                  Explore Hardware
                </Link>
                <Link
                  to=""
                  className="w-full rounded-lg border-2 border-textcolor px-4 py-3 text-center font-semibold text-textcolor shadow-sm transition-all duration-300 hover:border-none hover:bg-textsecondary hover:text-bgcolor sm:w-auto sm:px-6"
                >
                  Post a site
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full px-5 py-12 sm:px-6 md:py-16 lg:py-20"
      >
        <motion.div variants={container} className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center">
            <motion.div
              variants={item}
              className="mb-8 w-full max-w-3xl text-center"
            >
              <h2 className="text-2xl font-bold leading-tight text-textcolor sm:text-3xl md:text-4xl">
                <span className="text-textcolor">What is </span>
                <span className="text-textsecondary">Ramani </span>
                <span className="text-textcolor">all about?</span>
              </h2>
            </motion.div>

            <motion.div
              variants={container}
              className="w-full max-w-3xl space-y-4 sm:space-y-5"
            >
              <motion.p
                variants={item}
                className="text-base leading-relaxed text-textcolor sm:text-lg sm:leading-loose"
              >
                Ramani is a digital platform that connects users with trusted
                hardware suppliers, construction professionals, and job
                opportunities across Tanzania. It brings together the essential
                players in the construction industry, making access to resources
                and services fast and reliable.
              </motion.p>

              <motion.p
                variants={item}
                className="text-base leading-relaxed text-textcolor sm:text-lg sm:leading-loose"
              >
                Whether you're looking to buy construction materials, hire
                handymen, find construction jobs, or promote your services as a
                supplier or engineer — Ramani provides everything you need in
                one place.
              </motion.p>
            </motion.div>

            <motion.div
              variants={item}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mt-8 sm:mt-10 md:mt-12"
            >
              <Link
                to="/register"
                className="inline-block rounded-lg bg-textcolor px-6 py-3 text-sm font-medium text-bgcolor shadow-sm transition-colors duration-300 hover:shadow-md sm:px-8 sm:py-3.5 sm:text-base"
              >
                Sign Up Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
