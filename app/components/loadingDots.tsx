import { motion } from "framer-motion";

export function LoadingThreeDotsPulse() {
  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      animate="pulse"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="loading-container"
    >
      <motion.div className="dot" variants={dotVariants} />
      <motion.div className="dot" variants={dotVariants} />
      <motion.div className="dot" variants={dotVariants} />
      <style>
        {`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 5rem;
            gap: 20px;
          }

          .dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: red;
            will-change: transform;
          }
        `}
      </style>
    </motion.div>
  );
}
