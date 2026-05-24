import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari, Noto_Sans_Bengali, Noto_Sans_Gurmukhi } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-inter",
});

const notoDevanagari = Noto_Sans_Devanagari({
    subsets: ["devanagari"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-devanagari",
});

const notoBengali = Noto_Sans_Bengali({
    subsets: ["bengali"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-bengali",
});

const notoGurmukhi = Noto_Sans_Gurmukhi({
    subsets: ["gurmukhi"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-gurmukhi",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://banavatnest.com"),
    title: {
        default: "BanavatNest — Research-Led Innovation by Dr. Sukhdev Singh & Dr. Sangita Roy",
        template: "%s | BanavatNest",
    },
    description:
        "BanavatNest Private Limited, founded by Dr. Sukhdev Singh and Dr. Sangita Roy, transforms curiosity into practical, scalable, and impactful solutions through systematic investigation in AI, Machine Learning, Cybersecurity, IoT, Smart Systems, Healthcare, and Agriculture.",
    keywords: [
        "BanavatNest",
        "BanavatNest Private Limited",
        "Dr. Sukhdev Singh",
        "Dr. Sangita Roy",
        "Research",
        "Innovation",
        "Artificial Intelligence",
        "AI",
        "Machine Learning",
        "Data Science",
        "Cybersecurity",
        "Internet of Things",
        "IoT",
        "Blockchain",
        "Smart Systems",
        "Healthcare",
        "Sustainability",
        "Agriculture",
        "Smart Farming",
        "Precision Agriculture",
        "R&D",
        "Technology Transfer",
        "Product Prototyping",
        "Industry Academia Collaboration",
        "Research and Development India",
        "Innovation Ecosystem India",
    ],
    authors: [{ name: "Dr. Sukhdev Singh" }, { name: "Dr. Sangita Roy" }, { name: "BanavatNest Private Limited" }],
    creator: "BanavatNest Private Limited",
    publisher: "BanavatNest Private Limited",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "BanavatNest | Research-Led Innovation by Dr. Sukhdev Singh & Dr. Sangita Roy",
        description:
            "BanavatNest Private Limited, founded by Dr. Sukhdev Singh and Dr. Sangita Roy, transforms curiosity into practical, scalable, and impactful solutions through systematic research in AI, Cybersecurity, Smart Systems, and Agriculture.",
        url: "https://banavatnest.com",
        siteName: "BanavatNest",
        images: [
            {
                url: "/logo.jpg",
                width: 1200,
                height: 630,
                alt: "BanavatNest — Research-Led Innovation Ecosystem by Dr. Sukhdev Singh & Dr. Sangita Roy",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "BanavatNest | Research-Led Innovation by Dr. Sukhdev Singh & Dr. Sangita Roy",
        description:
            "BanavatNest Private Limited transforms curiosity into practical, scalable solutions through systematic research in AI, Cybersecurity, Smart Systems, and Agriculture.",
        images: ["/logo.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/logo.jpg",
        apple: "/logo.jpg",
    },
    alternates: {
        canonical: "https://banavatnest.com",
    },
};

// JSON-LD Structured Data
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BanavatNest Private Limited",
    alternateName: "BanavatNest",
    url: "https://banavatnest.com",
    logo: "https://banavatnest.com/logo.jpg",
    description:
        "BanavatNest transforms curiosity into practical, scalable, and impactful solutions through systematic investigation in AI, Cybersecurity, Smart Systems, and Agriculture.",
    contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-99340-44777",
        contactType: "General Inquiry",
        email: "info@banavatnest.com",
        availableLanguage: ["English", "Hindi", "Punjabi", "Bengali"],
    },
    sameAs: [
        "https://www.linkedin.com/company/banavatnest-pvt-ltd/",
        "https://www.facebook.com/profile.php?id=61587883936129",
    ],
    foundingDate: "2024",
    founders: [
        {
            "@type": "Person",
            name: "Dr. Sukhdev Singh",
            jobTitle: "Director",
        },
        {
            "@type": "Person",
            name: "Dr. Sangita Roy",
            jobTitle: "Director",
        },
    ],
    address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
    },
    areaServed: "IN",
    knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Cybersecurity",
        "Internet of Things",
        "Precision Agriculture",
        "Smart Systems",
        "Data Science",
        "Blockchain",
    ],
};

export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as typeof routing.locales[number])) {
        notFound();
    }

    // Load messages for the current locale
    const messages = await getMessages();

    // Select font based on locale
    const getFontClass = () => {
        switch (locale) {
            case 'hi':
                return `${inter.variable} ${notoDevanagari.variable} font-sans`;
            case 'pa':
                return `${inter.variable} ${notoGurmukhi.variable} font-sans`;
            case 'bn':
                return `${inter.variable} ${notoBengali.variable} font-sans`;
            default:
                return `${inter.variable} font-sans`;
        }
    };

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Inline script to prevent flash of wrong theme */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
                    }}
                />
            </head>
            <body
                className={`${getFontClass()} antialiased min-h-screen flex flex-col selection:bg-[#3A9B9B]/20 selection:text-[#2D3561] dark:selection:text-zinc-100 transition-colors bg-zinc-50 dark:bg-[#09090b]`}
            >
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Navbar />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
