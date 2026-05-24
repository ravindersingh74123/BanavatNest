'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';

interface UpdateItem {
    title: string;
    route: string;
}

interface InfiniteUpdateBarProps {
    updates: UpdateItem[];
}

const InfiniteUpdateBar: React.FC<InfiniteUpdateBarProps> = ({ updates }) => {
    const loopedUpdates = [...updates, ...updates, ...updates, ...updates];

    return (
        <div className="w-full bg-[#3A9B9B]/10 border-b border-[#3A9B9B]/20 py-4 overflow-hidden flex items-center relative z-20">
            {/* Label Badge */}
            <div className="absolute left-0 z-10 flex items-center h-full pl-4 pr-8 bg-gradient-to-r from-zinc-50 via-zinc-50 to-transparent dark:from-[#09090b] dark:via-[#09090b]">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#3A9B9B] text-white uppercase tracking-wider shadow-sm">
                    Latest Updates
                </span>
            </div>

            {/* Scrolling Content */}
            <div className="flex overflow-hidden w-full mask-fade-sides select-none relative">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 60,
                    }}
                    style={{ width: "max-content" }}
                >
                    {loopedUpdates.map((update, idx) => (
                        <Link
                            key={idx}
                            href={update.route}
                            target="_blank"
                            className="mx-8 text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center hover:text-[#3A9B9B] dark:hover:text-[#3A9B9B] transition-colors"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3A9B9B] mr-3 inline-block animate-pulse"></span>
                            {update.title}
                        </Link>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default InfiniteUpdateBar;
