'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function TermsOfUsePage() {
    const t = useTranslations('terms');

    return (
        <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-4xl font-extrabold text-[#2D3561] dark:text-zinc-100 mb-2">{t('title')}</h1>
                {/* <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">{t('effectiveDate')}</p> */}

                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-zinc-300">
                    <p>{t('intro')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s1Title')}</h3>
                    <p>{t('s1Text')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s2Title')}</h3>
                    <p>{t('s2Text')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s3Title')}</h3>
                    <p>{t('s3Text')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s4Title')}</h3>
                    <p>{t('s4Text')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s5Title')}</h3>
                    <p>{t('s5Text')}</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>{t('s5Item1')}</li>
                        <li>{t('s5Item2')}</li>
                        <li>{t('s5Item3')}</li>
                        <li>{t('s5Item4')}</li>
                        <li>{t('s5Item5')}</li>
                        <li>{t('s5Item6')}</li>
                    </ul>
                    <p className="mt-4">{t('s5Footer')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s6Title')}</h3>
                    <p>{t('s6Text')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s7Title')}</h3>
                    <p>{t('s7Text')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s8Title')}</h3>
                    <p>{t('s8Text')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s9Title')}</h3>
                    <p>{t('s9Text')}</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>{t('s9Item1')}</li>
                        <li>{t('s9Item2')}</li>
                        <li>{t('s9Item3')}</li>
                        <li>{t('s9Item4')}</li>
                        <li>{t('s9Item5')}</li>
                    </ul>
                    <p className="mt-4">{t('s9Footer')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s10Title')}</h3>
                    <p>{t('s10Text')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s11Title')}</h3>
                    <p>{t('s11Text')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s12Title')}</h3>
                    <p>{t('s12Text')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s13Title')}</h3>
                    <p>{t('s13Text')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s14Title')}</h3>
                    <p>{t('s14Text')}</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>{t('s14Item1')}</li>
                        <li>{t('s14Item2')}</li>
                        <li>{t('s14Item3')}</li>
                        <li>{t('s14Item4')}</li>
                    </ul>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s15Title')}</h3>
                    <p>{t('s15Text')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s16Title')}</h3>
                    <p>{t('s16Text')}</p>

                    <h3 className="text-[#2D3561] dark:text-[#3A9B9B] mt-8 mb-4">{t('s17Title')}</h3>
                    <p>{t('s17Text')}</p>
                    <div className="mt-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <p className="font-bold text-[#2D3561] dark:text-zinc-100 mb-1">{t('s17Address')}</p>
                        <p>📧 <a href="mailto:info@banavatnest.com" className="text-[#3A9B9B] hover:underline transition-all">info@banavatnest.com</a></p>
                        <p>🌐 <a href="https://www.banavatnest.com" target="_blank" rel="noopener noreferrer" className="text-[#3A9B9B] hover:underline transition-all">www.banavatnest.com</a></p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
