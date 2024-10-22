import { AnimatePresence, motion } from "framer-motion";

interface MotionActionProps {
  children: React.ReactNode;
}

export default function MotionAction(props: Readonly<MotionActionProps>) {
  return (
    <AnimatePresence>
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} transition={{ duration: 0.5 }} className="absolute w-full top-1/4 md:top-[40%] left-1/4">
        <div className="w-1/2 py-1 bg-white shadow rounded divide-y divide-gray-200 text-sm" onClick={(e) => e.stopPropagation()}>
          {props.children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
