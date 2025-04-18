import { motion, HTMLMotionProps } from "framer-motion";
import { PropsWithChildren } from "react";

type SmoothWrapperProps = PropsWithChildren<HTMLMotionProps<"div">>;

export default function SmoothWrapper({ children, ...props }: SmoothWrapperProps) {
    return (
        <motion.div
            {...props}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.58, 0.68, 0.14, 0.5] }}
        >
            {children}
        </motion.div>
    );
}
