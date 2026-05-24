'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';
import { ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const t = useTranslations('nav');

    const navLinks = [
        {
            name: t('home'),
            path: '/' as const,
        },
        {
            name: t('aboutUs'),
            path: '/about' as const,
            subItems: [
                { name: t('ourName'), path: '/aboutUs' as const },
                { name: t('ourEcosystem'), path: '/bridge/collaboration' as const },
                { name: t('ourSupportNetwork'), path: '/about/board' as const },
            ]
        },
        {
            name: t('whatWeDo'),
            path: '/what-we-do' as const,
            subItems: [
                { name: t('focusAreas'), path: '/what-we-do/focus' as const },
                { name: t('domains'), path: '/what-we-do/domains' as const },
            ]
        },
        {
            name: t('bridge'),
            path: '/bridge' as const,
            subItems: [
                // { name: t('collaboration'), path: '/bridge/collaboration' as const },
                { name: t('opportunities'), path: '/bridge/opportunities' as const },
                { name: t('faculty'), path: '/bridge/faculty' as const },
                { name: t('partnerships'), path: '/bridge/partnerships' as const },
            ]
        },
        // {
        //     name: t('toolsUtilities'),
        //     path: '/tools' as const,
        //     subItems: [
        //         { name: t('emiCalculator'), path: "/tools/emi-calculator" as const },
        //         { name: t('gstCalculator'), path: "/tools/gst-calculator" as const },
        //     ]
        // },
    ];

    const handleDropdownEnter = (name: string) => {
        setActiveDropdown(name);
    };

    // Paths that belong to one nav section but are listed under another
    const pathOverrides: Record<string, string> = {
        '/bridge/collaboration': '/about',
        '/about/board': '/about',
    };

    const isActive = (linkPath: string) => {
        const effective = pathOverrides[pathname] ?? pathname;
        return effective.startsWith(linkPath);
    };

    const handleDropdownLeave = () => {
        setActiveDropdown(null);
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/90  backdrop-blur-xl border-b border-gray-100/50 transition-colors duration-300 no-print print:hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <Link href="/" className="flex items-center transition-transform hover:scale-[1.01]">
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative group h-20 flex items-center"
                                onMouseEnter={() => link.subItems && handleDropdownEnter(link.name)}
                                onMouseLeave={handleDropdownLeave}
                            >
                                {link.subItems ? (
                                    <button
                                        className={`text-sm font-bold transition-all flex items-center gap-1 py-1 ${isActive(link.path)
                                            ? 'text-[#3A9B9B] dark:text-[#3A9B9B]'
                                            : 'text-gray-600 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-900'
                                            }`}
                                    >
                                        {link.name}
                                        <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                                    </button>
                                ) : (
                                    <Link
                                        href={link.path}
                                        className={`text-sm font-bold transition-all relative py-1 ${pathname === link.path
                                            ? 'text-[#3A9B9B] dark:text-[#3A9B9B]'
                                            : 'text-gray-600 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-900'
                                            }`}
                                    >
                                        {link.name}
                                        {pathname === link.path && (
                                            <motion.div
                                                layoutId="navUnderline"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3A9B9B] rounded-full"
                                            />
                                        )}
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                {link.subItems && (
                                    <AnimatePresence>
                                        {activeDropdown === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 w-64 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden py-2"
                                            >
                                                {link.subItems.map((subItem) => (
                                                    <Link
                                                        key={subItem.path}
                                                        href={subItem.path}
                                                        className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-50 hover:text-[#3A9B9B] dark:hover:text-[#3A9B9B] font-medium transition-colors"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                        <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200 dark:border-gray-200">
                            <LanguageSwitcher />
                            <ThemeToggle />
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/contact"
                                    className="bg-[#2D3561] text-white px-7 py-2.5 rounded-full text-sm font-bold flex items-center hover:bg-[#1f2545] transition-all shadow-lg hover:shadow-[#3A9B9B]/20"
                                >
                                    {t('contact')} <ArrowUpRight className="ml-2 w-4 h-4" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-3">
                        <LanguageSwitcher />
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-900 focus:outline-none p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4 shadow-xl overflow-y-auto max-h-[80vh]"
                    >
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                {link.subItems ? (
                                    <div className="py-2 border-b border-gray-50 last:border-0 pointer-events-auto">
                                        <span className="block text-lg font-bold text-gray-900 dark:text-gray-900 mb-2">
                                            {link.name}
                                        </span>
                                        <div className="pl-4 space-y-2 border-l-2 border-gray-100">
                                            {link.subItems.map(subItem => (
                                                <Link
                                                    key={subItem.path}
                                                    href={subItem.path}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block text-sm font-medium text-gray-600 dark:text-gray-600 hover:text-[#3A9B9B] dark:hover:text-[#3A9B9B] py-1"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-lg font-bold text-gray-900 dark:text-gray-900 hover:text-[#3A9B9B] dark:hover:text-[#3A9B9B] py-2 border-b border-gray-50 last:border-0"
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center bg-[#2D3561] text-white px-6 py-4 rounded-xl font-bold shadow-lg mt-4"
                        >
                            {t('contact')}
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
