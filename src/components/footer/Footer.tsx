'use client';

import { Link } from '@/i18n/navigation';
import { Mail, Phone, Linkedin, Facebook, Instagram, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Logo from '../Logo';

const Footer = () => {
    const t = useTranslations('footer');
    const tNav = useTranslations('nav');
    const tCommon = useTranslations('common');

    const socialLinks = [
        { Icon: Linkedin, href: "https://www.linkedin.com/company/banavatnest-pvt-ltd/", label: "LinkedIn", color: "#0A66C2", hoverBg: "hover:bg-blue-50" },
        { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61587883936129", label: "Facebook", color: "#1877F2", hoverBg: "hover:bg-blue-50" },
        { Icon: Instagram, href: "https://www.instagram.com/banavatnest/", label: "Instagram", color: "#E1306C", hoverBg: "hover:bg-pink-50" },
    ];

    return (
        <footer className="bg-white pt-6 pb-6 border-t-2 border-[#3A9B9B]/30 relative overflow-hidden transition-colors no-print print:hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="inline-block transition-transform hover:scale-105 ">
                            <Logo className="h-20 w-auto" />
                        </Link>
                        <div className="text-gray-500 dark:text-gray-500 text-[12px] leading-relaxed font-bold space-y-1">
                            <p>{t('companyName')}</p>
                            <p>{t('cin')}</p>
                            <p>GSTIN: 19AANCB7293G1Z4</p>
                            <p>Udyam No: UDYAM-WB-12-0125063</p>
                        </div>
                        <div className="mt-4 flex space-x-3">
                            {socialLinks.map(({ Icon, href, label, color, hoverBg }, i) => (
                                <motion.div key={i} whileHover={{ y: -5, scale: 1.1 }}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className={`block p-2.5 bg-[#3A9B9B]/20 rounded-xl ${hoverBg} dark:hover:bg-blue-50 transition-all`}
                                        style={{ color }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-zinc-900 dark:text-zinc-900 font-bold mb-8 text-lg">{t('platform')}</h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-500 font-bold">
                            <li><Link href="/what-we-do/focus" className="hover:text-[#3A9B9B] dark:hover:text-[#3A9B9B] transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />{tNav('focusAreas')}</Link></li>
                            <li><Link href="/what-we-do/domains" className="hover:text-[#3A9B9B] dark:hover:text-[#3A9B9B] transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />{t('researchDomains')}</Link></li>
                            <li><Link href="/bridge/collaboration" className="hover:text-[#3A9B9B] dark:hover:text-[#3A9B9B] transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />{tNav('collaboration')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-zinc-900 dark:text-zinc-900 font-bold mb-8 text-lg">{t('company')}</h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-500 font-bold">
                            <li><Link href="/about/name" className="hover:text-[#3A9B9B] dark:hover:text-[#3A9B9B] transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#2D3561] mr-2" />{t('aboutUs')}</Link></li>
                            <li><Link href="/privacy" className="hover:text-[#3A9B9B] dark:hover:text-[#3A9B9B] transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#2D3561] mr-2" />{t('privacyPolicy')}</Link></li>
                            <li><Link href="/terms" className="hover:text-[#3A9B9B] dark:hover:text-[#3A9B9B] transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#2D3561] mr-2" />{t('termsOfUse')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-zinc-900 dark:text-zinc-900 font-bold mb-8 text-lg">{tNav('contact')} </h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-500 font-bold">
                            <li className="flex items-start"><Mail className="w-5 h-5 mr-3 text-[#3A9B9B] shrink-0" /> <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@banavatnest.com&su=Inquiry from Website&body=Hi BanavatNest Team,"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline text-[12px]"
                            >
                                info@banavatnest.com
                            </a></li>
                            <li className="flex items-start"><Phone className="w-5 h-5 mr-3 text-[#3A9B9B] shrink-0" /> <span className="text-[12px]"> +91 99340 44777 , +91 80023 96506</span></li>
                        </ul>

                        <div className="mt-4 space-y-4 text-sm text-gray-500 dark:text-gray-500">
                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-[#3A9B9B] shrink-0" />
                                <div>
                                    <span className="block text-zinc-900 text-[12px] font-bold mb-1">{t('registeredAddressLabel')}</span>
                                    <span className="block text-[12px] font-bold">{t('registeredAddress')}</span>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-[#3A9B9B] shrink-0" />
                                <div>
                                    <span className="block text-zinc-900 text-[12px] font-bold mb-1">{t('incubationSupportLabel')}</span>
                                    <span className="block text-[12px] font-bold">{t('incubationSupport')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t-2 border-[#3A9B9B]/30 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 dark:text-gray-400 font-medium">
                    <p>{tCommon('copyright', { year: new Date().getFullYear() })}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
