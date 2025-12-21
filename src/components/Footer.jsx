import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="bg-white text-center text-sm text-primary py-4 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      &copy; {new Date().getFullYear()} AlMaahir Academy. All rights reserved.
    </motion.footer>
  );
};

export default Footer;