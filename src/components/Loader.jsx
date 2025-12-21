import { motion } from "framer-motion";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center
      bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950">

      <div className="flex flex-col items-center gap-6">

        {/* LOGO / RING */}
        <div className="relative w-20 h-20">

          {/* Outer spinning ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4
              border-amber-300 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "linear",
            }}
          />

          {/* Inner glow */}
          <div className="absolute inset-3 rounded-full
            bg-gradient-to-br from-blue-900 to-purple-800
            shadow-[0_0_30px_rgba(251,191,36,0.25)]" />
        </div>

        {/* TEXT */}
        <motion.p
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
          }}
          className="text-sm tracking-widest uppercase
            text-amber-300 font-semibold"
        >
          {text}
        </motion.p>

      </div>
    </div>
  );
};

export default Loader;
